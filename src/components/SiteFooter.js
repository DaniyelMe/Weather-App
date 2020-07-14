import React from 'react';

const SiteFooter = ({ handler, theme, metric }) => {
	function toggleTheme() {
		handler('setTheme', !theme);
	}
	function toggleMetric() {
		handler('setMetric', !metric);
	}

	document.body.setAttribute('class', theme ? 'light-mode' : 'dark-mode');

	return (
		<footer className="site-footer">
			<div className="toggle toggle--daynight">
				<input
					type="checkbox"
					checked={theme}
					id="toggle--daynight"
					className="toggle--checkbox"
					onChange={toggleTheme}
				/>
				<label className="toggle--btn" htmlFor="toggle--daynight">
					<span className="toggle--feature"></span>
				</label>
			</div>

			<span>Made with ❤️ 2020</span>

			<div className="toggle toggle--degree">
				<input
					type="checkbox"
					checked={metric}
					htmlFor="toggle--degree"
					id="toggle--degree"
					className="toggle--checkbox"
					onChange={toggleMetric}
				/>
				<label className="toggle--btn" htmlFor="toggle--degree">
					<span className="toggle--feature"></span>
				</label>
			</div>
		</footer>
	);
};

export default SiteFooter;
