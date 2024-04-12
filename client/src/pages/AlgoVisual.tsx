import React, { Component } from 'react';
import AlgoVisualPathFinder from '../components/AlgoVisualPathFinder';
import AlgoVisualSorter from '../components/AlgoVisualSorter';
import './AlgoVisual.css';
import sortingGif from '../sorting.gif';
import pathFindingGif from '../pathFinding.gif';
import Header from '../components/Header';
import { Heading } from '@chakra-ui/react';

interface AlgoVisualState {
    pathFind: boolean;
    sorting: boolean;
}

class AlgoVisual extends Component<{}, AlgoVisualState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            pathFind: false,
            sorting: false
        };
        this.setHomePage = this.setHomePage.bind(this);
    }

    getHomePage() {
        return (
            <>
                <Header/>
                {/* <div className='centered-text'>
                    <Heading>
                        <h1 style={{ color: "#FFFFFF", fontFamily:"sans-serif", fontWeight:"bold", paddingTop:"80px"}}>Please choose either one</h1>
                    </Heading>
                </div> */}
                <div className='mode_options_container'>
                    <div>
                        {/* <h1> SORTING ALGORITHMS </h1> */}
                        <button onClick={() => this.setState({ sorting: true, pathFind: false })}>
                            <img src={sortingGif} alt="loading..." />
                        </button>
                    </div>
                    <div>
                        {/* <h1> PATH FINDING ALGORITHMS </h1> */}
                        <button onClick={() => this.setState({ pathFind: true, sorting: false })}>
                            <img src={pathFindingGif} alt="loading..." />
                        </button>
                    </div>
                </div>
            </>
        );
    }

    setHomePage() {
        this.setState({ pathFind: false, sorting: false });
    }

    render() {
        return (
            <div>
                {/* <HomeHeader setHomePage={this.setHomePage} /> */}
                <div className={'app_container'}>
                    {this.state.pathFind ? <AlgoVisualPathFinder />
                        : this.state.sorting ? <AlgoVisualSorter />
                            : this.getHomePage()
                    }
                </div>
            </div>
        );
    }
}

export default AlgoVisual;
