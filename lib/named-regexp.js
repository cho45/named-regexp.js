/**
 * Recognize (:<name>regexp) format named captures.
 * and replace exec method of returned RegExp object.
 *
 * This function does not used with normal captures.
 */
function named (regexp) {
	var names = [];
	var ret = new RegExp(regexp.source.replace(/\(:<(\w+)>/g, function (_, name) {
			names.push(name);
			return '(';
		}),
		(regexp.global     ? 'g' : '') +
		(regexp.ignoreCase ? 'i' : '') +
		(regexp.multiline  ? 'm' : '')
	);

	var captures = function (matched) {
		if (!matched) return matched;
		var captures = {};
		for (var i = 0, len = names.length; i < len; i++) {
			var name = names[i];
			if (!captures[name]) captures[name] = [];
			captures[name].push(matched[i + 1]);
		}
		matched.captures = captures;
		matched.capture = function (name) {
			return captures[name][ captures[name].length - 1 ];
		};
		return matched;
	};

	// override RegExp#exec
	ret.exec = function (string) {
		return captures(RegExp.prototype.exec.call(this, string));
	};

	// like String#replace
	ret.replace = function (string, replace) {
		if (typeof replace == 'function') {
			return string.replace(this, function () {
				return replace(captures(Array.prototype.slice.call(arguments)));
			});
		} else {
			return string.replace(this, replace);
		}
	};

	return ret;
}

this.named = named;

