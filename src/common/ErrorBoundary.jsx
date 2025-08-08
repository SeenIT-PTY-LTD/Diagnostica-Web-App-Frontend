import React from 'react';
import errorImage from '../assets/img/error.svg';

class ErrorBoundary extends React.Component {
	state = { error: false };

	static getDerivedStateFromError() {
		return { error: true };
	}

	componentDidCatch(error, info) {
		console.error('Error: ', error);
		console.error('Info: ', info.componentStack);
	}

	render() {
		if (this.state.error) {
			return (
				<div className="fixed inset-0 flex flex-col items-center justify-center p-4 text-center">
					<img
						src={errorImage}
						alt="Something went wrong"
						className="w-[50vh] mb-8"
					/>
					<h2 className="text-lg font-semibold mb-2">
						OOPS... SOMETHING WENT WRONG HERE
					</h2>
					<p className="mb-6 text-gray-600">
						The link you followed had some problem and it&apos;s broken
					</p>
					<button
						className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
						onClick={() => window.location.reload()}
					>
						Reload the page
					</button>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
