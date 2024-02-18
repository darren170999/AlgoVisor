import { useEffect, useState } from "react";
import Header from "../components/Header";
import Chart from "chart.js/auto"; // Import Chart.js library

interface BenchmarkData {
    time: number;
}

function BenchmarkPage() {
    const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([]);

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         // Fetch benchmark data from backend
        //         const response = await fetch('backend_api_endpoint');
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         const data = await response.json();
        //         setBenchmarkData(data);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // };

        // fetchData();
    }, []);

    useEffect(() => {
        // Create histogram
        const createHistogram = () => {
            // Process benchmarkData to create histogram data
            const timeRanges: { [key: string]: number } = {}; // Object to store counts for each time range
            benchmarkData.forEach(({ time }) => {
                const range = Math.floor(time).toString(); // Group by integer part of the time
                timeRanges[range] = (timeRanges[range] || 0) + 1;
            });

            // Prepare data for Chart.js
            const labels = Object.keys(timeRanges).sort((a, b) => parseInt(a) - parseInt(b)); // Sorted time ranges
            const counts = labels.map(range => timeRanges[range]);

            // Plot the histogram
            const ctx = document.getElementById('histogramChart') as HTMLCanvasElement | null;
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Code Speed Benchmark',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        };

        createHistogram();
    }, [benchmarkData]);

    return (
        <>
            <Header />
            <div>
                <h2>Code Speed Benchmark</h2>
                <canvas id="histogramChart" width="400" height="400"></canvas>
            </div>
        </>
    );
}

export default BenchmarkPage;
