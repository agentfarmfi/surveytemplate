'use client';

import { ApexOptions } from 'apexcharts';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarChartProps {
  max: number;
  results: any;
}

export const BarChart = ({ max, results }: BarChartProps) => {
  const { theme } = useTheme();
  const apexChartTheme = theme === 'dark' ? 'dark' : 'light';
  
  // Simple chart options
  const options: ApexOptions = {
    theme: {
      mode: apexChartTheme
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
      max,
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
        distributed: true
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
    <div className="print-chart-container w-full my-2 print:mb-0">
      <ApexChart
        type='bar'
        options={options}
        series={series}
        height={330}
        width='100%'
      />
    </div>
  );
};
