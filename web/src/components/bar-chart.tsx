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
      labels: {
        style: {
          fontFamily: 'Inter, sans-serif'
        }
      },
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
      colors: ['#f31260', '#f5a524', '#17c964'] // Red (Risk), Yellow (Innovation), Green (Planning)
    }
  };

  const series = [
    {
      name: 'You',
      data: results.map((result: any) => result.score)
    }
  ];

  return (
    <>
      <ApexChart
        type='bar'
        options={options}
        series={series}
        height={350}
        width='100%'
      />
    </>
  );
};
