import React from 'react';
import PropTypes from 'prop-types';
import '../components/Grid.css';

const Node = (props) => {
    const { nodeModifier, isSourceNode, isTargetNode, isWallNode, isWeakWallNode, isPathNode, isVisitedNode, isDefaultNode, nodeIndex } = props;

    const getNodeBackground = () => {
        if (isSourceNode) return 'source_node';
        if (isTargetNode) return 'target_node';
        if (isWallNode) return 'wall_node';
        if (isWeakWallNode) return 'weak_wall_node';
        if (isPathNode) return 'path_node';
        if (isVisitedNode) return 'visited_node';
        return 'default';
    };

    const mouseDownHandler = (e) => {
        e.preventDefault();
        const { isUpdateSourceNodeMode, isUpdateTargetNodeMode, setUpdateSourceNodeMode, setUpdateTargetNodeMode, setDrawingMode, updateDrawnNodes } = nodeModifier;

        if (isSourceNode && !isUpdateSourceNodeMode && !isUpdateTargetNodeMode) {
            setUpdateSourceNodeMode();
        } else if (isTargetNode && !isUpdateTargetNodeMode && !isUpdateSourceNodeMode) {
            setUpdateTargetNodeMode();
        } else if (!isSourceNode && !isTargetNode && !isUpdateSourceNodeMode && !isUpdateTargetNodeMode) {
            setDrawingMode(true);
            if (isDefaultNode) updateDrawnNodes(nodeIndex);
        }
    };

    const mouseUpHandler = () => {
        const { isUpdateSourceNodeMode, isUpdateTargetNodeMode, isDrawingMode, updateSourceNode, updateTargetNode, setDrawingMode } = nodeModifier;

        if (isUpdateSourceNodeMode && isDefaultNode) {
            updateSourceNode(nodeIndex);
        } else if (isUpdateTargetNodeMode && isDefaultNode) {
            updateTargetNode(nodeIndex);
        } else if (isDrawingMode) {
            setDrawingMode(false);
        }
    };

    const mouseEnterHandler = () => {
        const { isDrawingMode, updateDrawnNodes } = nodeModifier;
        if (isDrawingMode && isDefaultNode) {
            updateDrawnNodes(nodeIndex);
        }
    };

    const background = getNodeBackground();

    return (
        <td
            className={background}
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
            onMouseEnter={mouseEnterHandler}
        ></td>
    );
};

Node.propTypes = {
    nodeModifier: PropTypes.object.isRequired,
    isSourceNode: PropTypes.bool.isRequired,
    isTargetNode: PropTypes.bool.isRequired,
    isWallNode: PropTypes.bool.isRequired,
    isWeakWallNode: PropTypes.bool.isRequired,
    isPathNode: PropTypes.bool.isRequired,
    isVisitedNode: PropTypes.bool.isRequired,
    isDefaultNode: PropTypes.bool.isRequired,
    nodeIndex: PropTypes.object.isRequired,
};

export default Node;
