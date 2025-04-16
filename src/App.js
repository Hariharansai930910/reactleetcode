import React, { useState, useEffect } from 'react';

// Import all flashcard data - using relative paths to the flashcardData folder
import { arraysHashingFlashcards } from './flashcardData/arraysHashingFlashcards';
import { twoPointersFlashcards } from './flashcardData/twoPointersFlashcards';
import { stackFlashcards } from './flashcardData/stackFlashcards';
import { binarySearchFlashcards } from './flashcardData/binarySearchFlashcards';
import { slidingWindowFlashcards } from './flashcardData/slidingWindowFlashcards';
import { linkedListFlashcards } from './flashcardData/linkedListFlashcards';
import { treesFlashcards } from './flashcardData/treesFlashcards';
import { trieFlashcards } from './flashcardData/trieFlashcards';
import { backtrackingFlashcards } from './flashcardData/backtrackingFlashcards';
import { heapPriorityQueueFlashcards } from './flashcardData/heapPriorityQueueFlashcards';
import { intervalsFlashcards } from './flashcardData/intervalsFlashcards';
import { greedyFlashcards } from './flashcardData/greedyFlashcards';
import { graphsFlashcards } from './flashcardData/graphsFlashcards';
import { advancedGraphsFlashcards } from './flashcardData/advancedGraphsFlashcards';
import { oneDDPFlashcards } from './flashcardData/oneDDPFlashcards';
import { twoDDPFlashcards } from './flashcardData/twoDDPFlashcards';
import { bitManipulationFlashcards } from './flashcardData/bitManipulationFlashcards';
import { mathGeometryFlashcards } from './flashcardData/mathGeometryFlashcards';

// Add CSS for flip card functionality
const styles = `
  .perspective-lg {
    perspective: 1000px;
  }
  
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

const App = () => {
  const [topics, setTopics] = useState([
    { id: 1, name: 'Arrays and Hashing', problems: 9, available: true },
    { id: 2, name: 'Two Pointers', problems: 5, available: true },
    { id: 3, name: 'Stack', problems: 7, available: true },
    { id: 4, name: 'Binary Search', problems: 7, available: true },
    { id: 5, name: 'Sliding Window', problems: 6, available: true },
    { id: 6, name: 'Linked List', problems: 11, available: true },
    { id: 7, name: 'Trees', problems: 15, available: true },
    { id: 8, name: 'Tries', problems: 3, available: true },
    { id: 9, name: 'Backtracking', problems: 9, available: true },
    { id: 10, name: 'Heap/Priority Queue', problems: 7, available: true },
    { id: 11, name: 'Intervals', problems: 6, available: true },
    { id: 12, name: 'Greedy', problems: 8, available: true },
    { id: 13, name: 'Advanced Graphs', problems: 6, available: true },
    { id: 14, name: 'Graphs', problems: 13, available: true },
    { id: 15, name: '1-D Dynamic Programming', problems: 12, available: true },
    { id: 16, name: '2-D Dynamic Programming', problems: 11, available: true },
    { id: 17, name: 'Bit Manipulation', problems: 7, available: true },
    { id: 18, name: 'Math & Geometry', problems: 8, available: true },
  ]);

  // Create a mapping of topic IDs to their respective flashcard arrays
  const flashcardsByTopic = {
    1: arraysHashingFlashcards,
    2: twoPointersFlashcards,
    3: stackFlashcards,
    4: binarySearchFlashcards,
    5: slidingWindowFlashcards,
    6: linkedListFlashcards,
    7: treesFlashcards,
    8: trieFlashcards,
    9: backtrackingFlashcards,
    10: heapPriorityQueueFlashcards,
    11: intervalsFlashcards,
    12: greedyFlashcards,
    13: advancedGraphsFlashcards,
    14: graphsFlashcards,
    15: oneDDPFlashcards,
    16: twoDDPFlashcards,
    17: bitManipulationFlashcards,
    18: mathGeometryFlashcards
  };

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    // Fetch data for selected topic using our mapping
    if (selectedTopic) {
      const topicFlashcards = flashcardsByTopic[selectedTopic.id] || [];
      setFlashcards(topicFlashcards);
      
      // Reset flipped cards state when changing topics
      setFlippedCards({});
    }
  }, [selectedTopic]);

  const handleTopicClick = (topic) => {
    if (topic.available) {
      setSelectedTopic(topic);
      setSelectedCard(null);
    }
  };

  const handleBackClick = () => {
    if (selectedCard) {
      setSelectedCard(null);
    } else {
      setSelectedTopic(null);
    }
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // Main page with topic buttons
  const renderTopicSelection = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">LeetCode Flashcards</h1>
      <h2 className="text-xl mb-4">Select a Topic</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map(topic => (
          <div 
            key={topic.id}
            onClick={() => handleTopicClick(topic)}
            className={`p-4 rounded-lg cursor-pointer ${
              topic.available ? 'bg-blue-100 hover:bg-blue-200' : 'bg-gray-100 cursor-not-allowed'
            }`}
          >
            <h3 className="font-bold">{topic.name}</h3>
            <p className="text-sm">
              {topic.problems} problem{topic.problems !== 1 ? 's' : ''}
              {!topic.available && ' (Coming soon)'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // List of flashcards for selected topic
  const renderFlashcardList = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackClick}
          className="mr-4 bg-gray-200 hover:bg-gray-300 p-2 rounded"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{selectedTopic.name} Flashcards</h1>
      </div>
      
      {flashcards.length === 0 ? (
        <p>No flashcards available for this topic yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flashcards.map(card => {
            const isFlipped = flippedCards[card.id];
            return (
              <div 
                key={card.id} 
                className="h-64 perspective-lg"
              >
                <div 
                  className={`relative h-full w-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                  onClick={() => setFlippedCards({...flippedCards, [card.id]: !isFlipped})}
                >
                  {/* Front side - Question and Hint */}
                  <div className="absolute w-full h-full bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-md backface-hidden cursor-pointer">
                    <div className="flex flex-col h-full">
                      <h3 className="font-bold text-lg text-blue-700 mb-4">{card.title}</h3>
                      <div className="flex-grow mb-4">
                        <h4 className="font-medium mb-2">Question:</h4>
                        <p className="text-sm">{card.question}</p>
                      </div>
                      <div className="mt-auto border-t border-blue-200 pt-3">
                        <h4 className="font-medium text-sm mb-1">Hint:</h4>
                        <p className="text-sm italic text-gray-600">{card.hint}</p>
                      </div>
                      <p className="text-xs text-center mt-2 text-gray-400">Click to flip</p>
                    </div>
                  </div>
                  
                  {/* Back side - Code, Mnemonics, Explanations */}
                  <div className="absolute w-full h-full bg-white border border-gray-200 rounded-lg p-4 shadow-md backface-hidden rotate-y-180 overflow-auto cursor-pointer">
                    <div className="flex flex-col h-full">
                      <h3 className="font-bold text-lg text-gray-800">{card.title}</h3>
                      
                      <div className="flex-grow overflow-auto">
                        <div className="mb-3">
                          <h4 className="font-medium text-sm">In One Line:</h4>
                          <p className="text-sm">{card.oneLiner}</p>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="font-medium text-sm">Simple Explanation:</h4>
                          <p className="text-xs whitespace-pre-line">{card.simpleExplanation}</p>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="font-medium text-sm">Mnemonics:</h4>
                          <ul className="text-xs list-disc pl-4">
                            {card.mnemonics.map((mnemonic, index) => (
                              <li key={index}>{mnemonic}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <button 
                        className="mt-auto block w-full py-1 bg-green-100 text-green-800 rounded text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(card);
                        }}
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Detailed view of a single flashcard
  const renderFlashcardDetail = () => (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={handleBackClick}
          className="mr-4 bg-gray-200 hover:bg-gray-300 p-2 rounded"
        >
          ← Back
        </button>
        <h1 className="text-xl font-bold">{selectedCard.title}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Question:</h2>
          <p>{selectedCard.question}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">In One Line:</h2>
          <p>{selectedCard.oneLiner}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Simple Explanation:</h2>
          <p className="whitespace-pre-line">{selectedCard.simpleExplanation}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Mnemonics:</h2>
          <ul className="list-disc pl-6">
            {selectedCard.mnemonics.map((mnemonic, index) => (
              <li key={index}>{mnemonic}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-800 text-white p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Code Implementation:</h2>
        <pre className="overflow-x-auto text-sm">
          <code>{selectedCard.code}</code>
        </pre>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-2">
          <span className="font-semibold">Time Complexity:</span> {selectedCard.timeComplexity}
        </div>
        <div>
          <span className="font-semibold">Space Complexity:</span> {selectedCard.spaceComplexity}
        </div>
      </div>
    </div>
  );

  // Render the appropriate view based on app state
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{styles}</style>
      {!selectedTopic && renderTopicSelection()}
      {selectedTopic && !selectedCard && renderFlashcardList()}
      {selectedTopic && selectedCard && renderFlashcardDetail()}
    </div>
  );
};

export default App;
