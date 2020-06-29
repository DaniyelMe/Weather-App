import React from 'react';
const SiteFooter = ({ theme, setTheme }, { metric, setMetric }) => {
	const toggleTheme = () => {
		setTheme = !theme;
	};
	const toggleMetric = () => {
		setMetric = !metric;
	};

	return (
		<footer class="site-footer">
			<div class="toggle toggle--daynight">
				<input type="checkbox" checked={theme} id="toggle--daynight" class="toggle--checkbox" onClick="toggleTheme" />
				<label class="toggle--btn" for="toggle--daynight">
					<span class="toggle--feature"></span>
				</label>
			</div>

			<span>Made with ❤️ 2020</span>

			<div class="toggle toggle--degree">
				<input type="checkbox" checked={metric} id="toggle--degree" class="toggle--checkbox" onClick="toggleMetric" />
				<label class="toggle--btn" for="toggle--degree">
					<span class="toggle--feature"></span>
				</label>
			</div>
		</footer>
	);
};

export default SiteFooter;
