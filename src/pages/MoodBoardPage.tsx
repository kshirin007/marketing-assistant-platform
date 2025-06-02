import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Image, Type, Palette, Save, Download, Trash2, Lock, Sparkles, MoveHorizontal } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/Card';
import { subscriptionPlans } from '../data/mockData';

// Types
interface MoodBoardItem {
  id: string;
  type: 'image' | 'color' | 'text';
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

interface SavedMoodBoard {
  id: string;
  name: string;
  createdAt: string;
  items: MoodBoardItem[];
}

// Mock user data - in a real app this would come from auth/backend
const mockUserData = {
  tier: 'free', // 'free', 'premium', or 'expert'
  boards: [
    {
      id: '1',
      name: 'Modern Tech Brand',
      createdAt: '2025-04-10T15:30:00Z',
      items: []
    },
    {
      id: '2',
      name: 'Eco-Friendly Campaign',
      createdAt: '2025-04-08T09:15:00Z',
      items: []
    }
  ]
};

const MoodBoardPage: React.FC = () => {
  const [userTier, setUserTier] = useState<'free' | 'premium' | 'expert'>(mockUserData.tier as any);
  const [boardItems, setBoardItems] = useState<MoodBoardItem[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [boardName, setBoardName] = useState('Untitled Board');
  const [savedBoards, setSavedBoards] = useState<SavedMoodBoard[]>(mockUserData.boards);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [colorValue, setColorValue] = useState('#3B82F6');
  const [textValue, setTextValue] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showAiResults, setShowAiResults] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; itemId: string | null }>({ 
    startX: 0, 
    startY: 0, 
    itemId: null 
  });

  // Generate a random ID for items
  const generateId = () => Math.random().toString(36).substring(2, 11);

  // Load a saved board
  const loadBoard = (boardId: string) => {
    const board = savedBoards.find(b => b.id === boardId);
    if (board) {
      setBoardName(board.name);
      setBoardItems(board.items);
      setSelectedBoard(boardId);
    }
  };

  // Save the current board
  const saveBoard = () => {
    if (userTier === 'free') {
      setShowPremiumModal(true);
      return;
    }

    const updatedBoard: SavedMoodBoard = {
      id: selectedBoard || generateId(),
      name: boardName,
      createdAt: new Date().toISOString(),
      items: boardItems
    };

    if (selectedBoard) {
      // Update existing board
      setSavedBoards(boards => boards.map(board => 
        board.id === selectedBoard ? updatedBoard : board
      ));
    } else {
      // Create new board
      setSavedBoards(boards => [...boards, updatedBoard]);
      setSelectedBoard(updatedBoard.id);
    }
  };

  // Create a new board
  const createNewBoard = () => {
    if (userTier === 'free') {
      setShowPremiumModal(true);
      return;
    }

    setBoardName('Untitled Board');
    setBoardItems([]);
    setSelectedBoard(null);
  };

  // Add a new item to the board
  const addItem = (type: 'image' | 'color' | 'text') => {
    if (userTier === 'free') {
      setShowPremiumModal(true);
      return;
    }

    let content = '';
    
    switch (type) {
      case 'image':
        if (!imageUrl) return;
        content = imageUrl;
        setImageUrl('');
        break;
      case 'color':
        content = colorValue;
        break;
      case 'text':
        if (!textValue) return;
        content = textValue;
        setTextValue('');
        break;
    }

    const newItem: MoodBoardItem = {
      id: generateId(),
      type,
      content,
      position: { x: 50, y: 50 },
      size: { 
        width: type === 'color' ? 100 : (type === 'text' ? 200 : 200),
        height: type === 'color' ? 100 : (type === 'text' ? 100 : 150)
      },
      zIndex: boardItems.length + 1
    };

    setBoardItems(items => [...items, newItem]);
    setShowAddMenu(false);
  };

  // Remove an item from the board
  const removeItem = (id: string) => {
    setBoardItems(items => items.filter(item => item.id !== id));
    if (activeItem === id) {
      setActiveItem(null);
    }
  };

  // Start dragging an item
  const startDrag = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    e.stopPropagation();
    setActiveItem(id);
    
    // Bring the item to the top
    setBoardItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, zIndex: Math.max(...items.map(i => i.zIndex)) + 1 } 
          : item
      )
    );

    let clientX: number;
    let clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Get item position
    const item = boardItems.find(item => item.id === id);
    if (!item) return;
    
    dragRef.current = {
      startX: clientX - item.position.x,
      startY: clientY - item.position.y,
      itemId: id
    };
  };

  // Handle mouse/touch move
  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (!dragRef.current.itemId) return;
    
    let clientX: number;
    let clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - dragRef.current.startX;
    const y = clientY - dragRef.current.startY;

    setBoardItems(items => 
      items.map(item => 
        item.id === dragRef.current.itemId 
          ? { ...item, position: { x, y } } 
          : item
      )
    );
  };

  // End dragging
  const endDrag = () => {
    dragRef.current = { startX: 0, startY: 0, itemId: null };
  };

  // Generate AI marketing suggestions based on the mood board
  const analyzeBoard = () => {
    if (userTier === 'free') {
      setShowPremiumModal(true);
      return;
    }

    setAiLoading(true);
    
    // In a real app, we would send the board data to an AI service
    // For demo purposes, we'll simulate a response after a delay
    setTimeout(() => {
      setAiLoading(false);
      setShowAiResults(true);
    }, 2000);
  };

  // Handle premium upgrade
  const handleUpgrade = () => {
    // In a real app, this would redirect to subscription page or show payment modal
    setShowPremiumModal(false);
  };

  // Upgrade to premium (demo)
  const upgradeToPremium = () => {
    setUserTier('premium');
    setShowPremiumModal(false);
  };

  // Set up event listeners for drag operations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDrag(e);
    const handleTouchMove = (e: TouchEvent) => handleDrag(e);
    const handleMouseUp = () => endDrag();
    const handleTouchEnd = () => endDrag();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [boardItems]);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mood Board Creator
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create visual inspiration boards to define your brand's style and get AI marketing suggestions.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            onClick={createNewBoard} 
            variant="outline" 
            size="sm"
          >
            New Board
          </Button>
          <Button 
            onClick={saveBoard} 
            variant="primary" 
            size="sm"
          >
            <Save size={16} className="mr-1" /> Save
          </Button>
        </div>
      </div>

      {userTier === 'free' ? (
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <Lock size={48} className="mx-auto md:mx-0 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Unlock Premium Features
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Mood boards are available on Premium and Expert plans. Upgrade now to create unlimited boards, 
                    get AI-powered marketing suggestions, and more.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-3">
                    <Button onClick={() => setShowPremiumModal(true)}>
                      View Plans
                    </Button>
                    {/* Demo only: quick access to premium for testing */}
                    <Button variant="outline" onClick={upgradeToPremium} className="border-dashed">
                      Try Premium (Demo)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={boardName}
                      onChange={(e) => setBoardName(e.target.value)}
                      className="w-full text-lg font-semibold bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-900 dark:text-white"
                      placeholder="Board Name"
                    />
                  </div>
                  <div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setShowAddMenu(!showAddMenu)}
                      className="ml-2"
                    >
                      <Plus size={16} className="mr-1" /> Add
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={analyzeBoard}
                      className="ml-2 text-primary-600 dark:text-primary-400"
                    >
                      <Sparkles size={16} className="mr-1" /> Analyze
                    </Button>
                  </div>
                </CardHeader>
                
                {showAddMenu && (
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Add Image
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Enter image URL"
                            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <Button 
                            onClick={() => addItem('image')}
                            className="rounded-l-none"
                          >
                            <Image size={16} />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Add Color
                        </label>
                        <div className="flex">
                          <input
                            type="color"
                            value={colorValue}
                            onChange={(e) => setColorValue(e.target.value)}
                            className="h-[42px] w-12 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white"
                          />
                          <input
                            type="text"
                            value={colorValue}
                            onChange={(e) => setColorValue(e.target.value)}
                            className="flex-grow px-3 py-2 border-y border-r border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <Button 
                            onClick={() => addItem('color')}
                            className="ml-2"
                          >
                            <Palette size={16} />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Add Text Note
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            placeholder="Enter text"
                            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <Button 
                            onClick={() => addItem('text')}
                            className="rounded-l-none"
                          >
                            <Type size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <CardContent className="p-0 relative h-[500px] overflow-hidden">
                  <div 
                    ref={boardRef}
                    className="absolute inset-0 bg-gray-100 dark:bg-gray-800 overflow-auto"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  >
                    {boardItems.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        <MoveHorizontal size={48} className="mb-2 opacity-30" />
                        <p>Drag and arrange items on your mood board</p>
                        <p className="text-sm mt-2">Click the "Add" button to add images, colors, or text</p>
                      </div>
                    )}
                    {boardItems.map((item) => (
                      <div
                        key={item.id}
                        className={`absolute shadow-md rounded-md cursor-move ${
                          activeItem === item.id ? 'ring-2 ring-primary-500 shadow-lg' : ''
                        }`}
                        style={{
                          left: `${item.position.x}px`,
                          top: `${item.position.y}px`,
                          width: `${item.size.width}px`,
                          height: `${item.size.height}px`,
                          zIndex: item.zIndex,
                        }}
                        onMouseDown={(e) => startDrag(e, item.id)}
                        onTouchStart={(e) => startDrag(e, item.id)}
                      >
                        <div className="absolute top-1 right-1 z-10">
                          <button
                            className="bg-white dark:bg-gray-800 rounded-full p-1 text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-400 shadow-sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        
                        {item.type === 'image' && (
                          <img
                            src={item.content}
                            alt="Mood board item"
                            className="w-full h-full object-cover rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x150?text=Image+Error';
                            }}
                          />
                        )}
                        
                        {item.type === 'color' && (
                          <div
                            className="w-full h-full rounded-md flex items-center justify-center text-xs font-mono"
                            style={{ backgroundColor: item.content }}
                          >
                            <span className={`px-2 py-1 rounded bg-white/70 dark:bg-black/50 ${
                              isLightColor(item.content) ? 'text-gray-900' : 'text-white'
                            }`}>
                              {item.content}
                            </span>
                          </div>
                        )}
                        
                        {item.type === 'text' && (
                          <div className="w-full h-full rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 overflow-auto text-gray-900 dark:text-white">
                            {item.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Boards</CardTitle>
                  <CardDescription>
                    Your previously created mood boards
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {savedBoards.length > 0 ? (
                    <div className="space-y-2">
                      {savedBoards.map((board) => (
                        <div 
                          key={board.id}
                          className={`p-3 cursor-pointer rounded-lg transition-colors ${
                            selectedBoard === board.id 
                              ? 'bg-primary-100 dark:bg-primary-900/30 border-l-4 border-primary-500' 
                              : 'hover:bg-gray-100 dark:hover:bg-gray-800 border-l-4 border-transparent'
                          }`}
                          onClick={() => loadBoard(board.id)}
                        >
                          <div className="font-medium text-gray-900 dark:text-white">
                            {board.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(board.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      <p>No saved boards yet</p>
                      <p className="text-sm mt-1">Create and save your first board</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={analyzeBoard}
                  >
                    <Sparkles size={16} className="mr-2" /> 
                    AI Analysis
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* AI Analysis Results */}
          {showAiResults && (
            <Card className="mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-100 dark:border-primary-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                  AI Marketing Suggestions
                </CardTitle>
                <CardDescription>
                  Based on your mood board, here are personalized marketing recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Brand Personality</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Your mood board suggests a modern, minimalist aesthetic with a focus on simplicity and elegance.
                      The color palette indicates a professional yet approachable brand personality.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Recommended Platforms</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                        <div className="font-medium">Instagram</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Visual storytelling</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Professional audience</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                        <div className="font-medium">Pinterest</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Visual discovery</div>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Direct engagement</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">Content Strategy</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Create clean, minimalist visuals with plenty of white space</li>
                      <li>Use your primary color palette consistently across all content</li>
                      <li>Focus on high-quality photography with subtle editing</li>
                      <li>Incorporate simple, elegant typography that matches your brand personality</li>
                      <li>Develop a consistent posting schedule focusing on quality over quantity</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-white/50 dark:bg-gray-800/50 border-t border-primary-100 dark:border-primary-800/30">
                <Button 
                  onClick={() => setShowAiResults(false)} 
                  variant="outline" 
                  className="mr-2"
                >
                  Close
                </Button>
                <Button>
                  <Download size={16} className="mr-2" /> 
                  Save Suggestions
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}

      {/* Premium Feature Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-slide-up">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upgrade to Premium
                </h2>
                <button 
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setShowPremiumModal(false)}
                >
                  &times;
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Mood boards and AI marketing suggestions are premium features. Upgrade to access:
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Unlimited mood boards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">AI-powered marketing suggestions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Advanced campaign templates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-success-500 dark:text-success-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-200">Custom marketing analysis</span>
                  </li>
                </ul>
                
                <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Starting at</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      $19.99<span className="text-sm font-normal text-gray-600 dark:text-gray-300">/month</span>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowPremiumModal(false)}
                    >
                      Not Now
                    </Button>
                    <Button
                      onClick={handleUpgrade}
                    >
                      View Plans
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to determine if a color is light or dark
const isLightColor = (color: string) => {
  // Convert hex to RGB
  let r, g, b;
  
  if (color.startsWith('#')) {
    const hex = color.substring(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (color.startsWith('rgb')) {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return true;
    r = parseInt(rgb[0]);
    g = parseInt(rgb[1]);
    b = parseInt(rgb[2]);
  } else {
    return true; // Default to light for unknown formats
  }
  
  // Calculate perceived brightness using YIQ formula
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128; // >= 128 is light, < 128 is dark
};

export default MoodBoardPage;