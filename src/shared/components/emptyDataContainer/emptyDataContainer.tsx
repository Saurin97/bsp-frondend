import React from 'react';
import './emptyDataContainer.css';

interface EmptyDataContainerProps {
	text: string;
	className?: string;
}

/**
 * EmptyDataContainer - empty data text container component
 */
const EmptyDataContainer: React.FC<EmptyDataContainerProps> = props => {
	return (
		<div className={`empty-data-wrapper ${props.className ? props.className : ''}`}>
			{props.text}
		</div>
	);
};

export default EmptyDataContainer;
