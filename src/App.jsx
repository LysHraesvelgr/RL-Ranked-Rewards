import { useState } from 'react';
import './App.css';
import resource from './resource.json';

function App() {
  const [currentReward, setCurrentReward] = useState('bronze');
  const [targetReward, setTargetReward] = useState('bronze');
  const [currentWins, setCurrentWins] = useState(0);
  const [customEndDate, setCustomEndDate] = useState(resource['end-date']);
  const [isCustomDate, setIsCustomDate] = useState(false);

  const ranks = Object.keys(resource.ranks);

  const calculateWins = () => {
    const currentRankValue = resource.ranks[currentReward];
    const targetRankValue = resource.ranks[targetReward];
    const remainingWins = targetRankValue - currentRankValue - currentWins;

    if (remainingWins <= 0) return { perWeek: 0, perDay: 0, perHour: 0 };

    const endDate = new Date(customEndDate);
    const currentDate = new Date();
    const timeDiff = endDate - currentDate;
    const daysRemaining = timeDiff / (1000 * 60 * 60 * 24);

    const perDay = remainingWins / daysRemaining;
    const perWeek = perDay * 7;
    const perHour = perDay / 24;

    return {
      perWeek: Math.ceil(perWeek),
      perDay: Math.ceil(perDay),
      perHour: Math.ceil(perHour),
    };
  };

  const { perWeek, perDay, perHour } = calculateWins();

  const resetEndDate = () => {
    setCustomEndDate(resource['end-date']);
    setIsCustomDate(false);
  };

  return (
    <div className="App">
      <h1>Ranked Rewards Tracker</h1>

      <div className="input-group">
        <label>Current Reward Level:</label>
        <select value={currentReward} onChange={(e) => setCurrentReward(e.target.value)}>
          {ranks.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>Current Wins (0-9):</label>
        <input
          type="number"
          min="0"
          max="9"
          value={currentWins}
          onChange={(e) => setCurrentWins(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>Target Reward Level:</label>
        <select value={targetReward} onChange={(e) => setTargetReward(e.target.value)}>
          {ranks.map((rank) => (
            <option key={rank} value={rank}>
              {rank}
            </option>
          ))}
        </select>
      </div>

      <div className="input-group">
        <label>End Date:</label>
        <input
          type="date"
          value={customEndDate}
          onChange={(e) => {
            setCustomEndDate(e.target.value);
            setIsCustomDate(true);
          }}
        />
        {isCustomDate && <button onClick={resetEndDate}>Reset to Default</button>}
      </div>

      <div className="results">
        <h2>Results</h2>
        <p>Wins per Week: {perWeek}</p>
        <p>Wins per Day: {perDay}</p>
        <p>Wins per Hour: {perHour}</p>
      </div>
    </div>
  );
}

export default App;
