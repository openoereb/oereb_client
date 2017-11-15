/**
 * @fileoverview Externs for Twitter Bootstrap
 * @see http://twitter.github.com/bootstrap/
 *
 * @author Qamal Kosim-Satyaputra
 * @externs
 */



// --- Modal ---

/** @constructor */
jQuery.modal.options = function() {};

/** @type {boolean} */
jQuery.modal.options.prototype.backdrop;

/** @type {boolean} */
jQuery.modal.options.prototype.keyboard;

/** @type {boolean} */
jQuery.modal.options.prototype.show;

/**
 * @param {=(string|jQuery.modal.options)} opt_eventOrOptions
 * @return {jQuery}
 */
jQuery.prototype.modal = function(opt_eventOrOptions) {};

// --- Tooltips ---

/** @constructor */
jQuery.tooltip.options = function() {};

/** @type {boolean} */
jQuery.tooltip.prototype.animation;

/** @type {string|function} */
jQuery.tooltip.prototype.placement;

/** @type {string} */
jQuery.tooltip.prototype.selector;

/** @type {string|function} */
jQuery.tooltip.prototype.title;

/** @type {string} */
jQuery.tooltip.prototype.trigger;

/** @type {number|{show: number, hide: number}} */
jQuery.tooltip.prototype.delay;

/**
 * @param {=(string|jQuery.tooltip.options)} opt_eventOrOptions
 * @return {jQuery}
 */
jQuery.prototype.tooltip = function(opt_eventOrOptions) {};

// --- Collapse ---

/** @constructor */
jQuery.collapse.options = function() {};

/** @type {jQuerySelector} */
jQuery.collapse.options.prototype.parent;

/** @type {boolean} */
jQuery.collapse.options.prototype.toggle;

/**
 * @param {=(string|jQuery.collapse.options)} opt_eventOrOptions
 */
jQuery.prototype.collapse = function(opt_eventOrOptions) {};