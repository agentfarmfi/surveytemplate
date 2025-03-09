'use client';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface OverviewBarChartProps {
  results: any[];
}

export const OverviewBarChart = ({ results }: OverviewBarChartProps) => {
  const options: ApexOptions = {
    theme: {
      mode: 'light'
    },
    legend: {
      show: false
    },
    chart: {
      toolbar: {
        show: false
      },
      fontFamily: 'Inter, sans-serif',
      background: 'transparent'
    },
    yaxis: {
      max: 5,
      title: {
        text: 'Score'
      }
    },
    xaxis: {
      categories: results.map((result: any) => result.title),
      title: {
        text: 'Scale: 1-5 (average scores)'
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        columnWidth: '70%'
      }
    },
    fill: {
      colors: ['#f31260', '#0070f3', '#f5a524', '#17c964'] // Red, Blue, Yellow, Green
    }
  };

  const series = [
    {
      name: 'You',
      data: results.map((result: any) => result.score)
    }
  ];

  return (
    <div className="w-full my-4 overview-chart-container">
      <ApexChart
        type='bar'
        options={options}
        series={series}
        height={380}
        width='100%'
      />
    </div>
  );
};