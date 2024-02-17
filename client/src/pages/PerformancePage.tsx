import { useEffect, useState } from "react";
import FullScreenSection from "../components/FullScreenSection";
import Header from "../components/Header";
import Chart from "chart.js/auto"; // Import Chart.js library

function PerformancePage(){

    const [performanceData, setPerformanceData] = useState<number[]>([]);

    useEffect(() => {
        // Call a function to fetch performance data from the server/database
        // For now, let's mock the data with a normal distribution
        const mockPerformanceData = generateMockPerformanceData();
        setPerformanceData(mockPerformanceData);
        
        // After setting the data, draw the graph
        drawGraph(mockPerformanceData);
    }, []);

    // Function to generate mock performance data (normal distribution)
    const generateMockPerformanceData = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            const value = Math.random() * 10; // Random number for demonstration
            data.push(value);
        }
        return data;
    };

    // Function to draw the graph
    const drawGraph = (data: number[]) => {
        const ctx = document.getElementById("performanceChart") as HTMLCanvasElement;
        new Chart(ctx, {
            type: "line",
            data: {
                labels: Array.from({ length: data.length }, (_, i) => (i + 1).toString()),
                datasets: [{
                    label: "Execution Time",
                    data: data,
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Test Case"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Execution Time (ms)"
                        }
                    }
                }
            }
        });
    };

    return(
        <>
            <Header/>
            <FullScreenSection backgroundColor="#1a1f71" isDarkBackground p={8} alignItems="flex-start" spacing={8}>
                <canvas id="performanceChart" width="400" height="400"></canvas>
            </FullScreenSection>
        </>
    );
}

export default PerformancePage;
