import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
    "Do not wait to strike till the iron is hot; but make it hot by striking. – William Butler Yeats",
    "The best way to predict your future is to create it. – Abraham Lincoln",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "I find that the harder I work, the more luck I seem to have. – Thomas Jefferson",
    "Success is not how high you have climbed, but how you make a positive difference to the world. – Roy T. Bennett",
    "In the end, it’s not the years in your life that count. It’s the life in your years. – Abraham Lincoln",
    "Keep your face always toward the sunshine—and shadows will fall behind you. – Walt Whitman",
    "The future belongs to those who believe in the beauty of their dreams. – Eleanor Roosevelt",
    "Believe you can and you’re halfway there. – Theodore Roosevelt",
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. – Brian Tracy",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "Life is what happens when you’re busy making other plans. – John Lennon",
    "Get busy living or get busy dying. – Stephen King",
    "You only live once, but if you do it right, once is enough. – Mae West",
    "Many of life’s failures are people who did not realize how close they were to success when they gave up. – Thomas A. Edison",
    "If you want to live a happy life, tie it to a goal, not to people or things. – Albert Einstein",
    "Never let the fear of striking out keep you from playing the game. – Babe Ruth",
    "The way to get started is to quit talking and begin doing. – Walt Disney",
    "The only way to do great work is to love what you do. – Steve Jobs",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson",
    "The best revenge is massive success. – Frank Sinatra",
    "Opportunities don't happen. You create them. – Chris Grosser",
    "You do not find the happy life. You make it. – Camilla E. Kimball",
    "Act as if what you do makes a difference. It does. – William James",
    "The only impossible journey is the one you never begin. – Tony Robbins",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
    "Hardships often prepare ordinary people for an extraordinary destiny. – C.S. Lewis",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
    "A goal without a plan is just a wish. – Antoine de Saint-Exupéry",
    "You must be the change you wish to see in the world. – Mahatma Gandhi",
    "The best way out is always through. – Robert Frost",
    "Everything you’ve ever wanted is on the other side of fear. – George Addair",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. – Christian D. Larson",
    "You are never too old to set another goal or to dream a new dream. – C.S. Lewis",
    "Success is not in what you have, but who you are. – Bo Bennett",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Your limitation—it’s only your imagination. – Unknown",
    "Push yourself, because no one else is going to do it for you. – Unknown",
    "Great things never come from comfort zones. – Unknown",
    "Dream it. Wish it. Do it. – Unknown",
    "Success doesn’t just find you. You have to go out and get it. – Unknown",
    "The harder you work for something, the greater you’ll feel when you achieve it. – Unknown",
    "Dream bigger. Do bigger. – Unknown",
    "Don’t stop when you’re tired. Stop when you’re done. – Unknown",
    "Wake up with determination. Go to bed with satisfaction. – Unknown",
    "The key to success is to focus on goals, not obstacles. – Unknown",
  ];

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const randomNumber = getRandomNumber(0, quotes.length);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center justify-center bg-gray-950 p-14 rounded-xl ">
        <div className="p-10 flex items-start">
          <h1 className="text-6xl font-serif font-bold text-teal-400 p-3 px-6">
            Wayto
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Welcome to Wayto</h1>
          <span className="text-lg text-gray-300">
            A Todo application that has various features like goal setting,
            daily tasks, and more...
          </span>
          <button
            type="button"
            className="mt-6 px-10 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 transform transition-transform duration-500 hover:scale-110"
            onClick={() => navigate("/home")}
          >
            Enter...
          </button>
          <div className="mt-8 text-sm text-gray-200 italic border-t-2 border-gray-700 pt-4">
            {quotes[randomNumber]}
          </div>
        </div>
      </div>
    </div>
  );
};
