import { useEffect, useState } from "react";
import Header from "../components/Header";
import Chart from "chart.js/auto"; // Import Chart.js library

interface BenchmarkData {
    time: number;
}

function BenchmarkPage() {
    

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
