'use client';

import {
  calculateSocialPresenceScore,
  calculateSpeedOptimizationScore,
  calculateUserExperienceScore,
} from '@/helpers/reportGeneration/scoreCalculator';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register all necessary components
ChartJS.register(...registerables);

// Score Chart Component
const ScoreChart = ({ score }: { score: number }) => {
  const getColor = (score: number) => {
    if (score <= 40) return '#FF6347'; // Red
    if (score <= 70) return '#FFD700'; // Yellow
    return '#32CD32'; // Green
  };

  const chartData = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [getColor(score), '#eaeaea'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: '80%',
    rotation: 270,
    circumference: 180,
    animation: {
      duration: 0,
    },
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
      datalabels: {
        display: true,
        formatter: () => {
          return `${Math.round(score)}%`;
        },
        color: '#000',
        font: {
          size: 24,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        margin: 'auto',
      }}
    >
      <Doughnut data={chartData} options={chartOptions} />
      <div
        style={{
          position: 'absolute',
          top: '62%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20px',
          color: 'black',
        }}
      >
        {Math.round(score)}
      </div>
    </div>
  );
};

// Main Score Section Component
const ScoreSection = (data: any) => {
  const socialScore = calculateSocialPresenceScore(data);
  const speedScore = calculateSpeedOptimizationScore(data);
  const userExperienceScore = calculateUserExperienceScore(data);

  return (
    <div
      style={{
        display: 'flex',
        gap: '150px',
        padding: '20px',
        marginTop: '60px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3>Social Presence</h3>
        <ScoreChart score={socialScore} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3>Speed & Optimizations</h3>
        <ScoreChart score={speedScore} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3>User Experience</h3>
        <ScoreChart score={userExperienceScore} />
      </div>
    </div>
  );
};

export default ScoreSection;
