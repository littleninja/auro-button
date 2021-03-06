// Copyright (c) Alaska Air. All right reserved. Licensed under the Apache-2.0 license
// See LICENSE in the project root for license information.

// ---------------------------------------------------------------------

import { LitElement, html, css } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { classMap } from 'lit-html/directives/class-map';
import 'focus-visible/dist/focus-visible.min.js';
import styleCss from "./style-css.js";

/**
 * @attr {Boolean} autofocus - This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it
 * @attr {Boolean} disabled - If set to true button will become disabled and not allow for interactions. Default value is `false`.
 * @attr {Boolean} ondark - Set value for on-dark version of auro-button
 * @attr {Boolean} secondary - Set value for secondary version of auro-button
 * @attr {Boolean} tertiary - Set value for tertiary version of auro-button
 * @attr {Boolean} arialabel - Populates the `aria-label` attribute that is used to define a string that labels the current element. Use it in cases where a text label is not visible on the screen. If there is visible text labeling the element, use `aria-labelledby` instead.
 * @attr {Boolean} arialabelledby - Populates the `aria-labelledby` attribute that establishes relationships between objects and their label(s), and its value should be one or more element IDs, which refer to elements that have the text needed for labeling. List multiple element IDs in a space delimited fashion.
 * @attr {Boolean} id - Set the unique ID of an element.
 * @attr {Boolean} title - Sets title attribute. The information is most often shown as a tooltip text when the mouse moves over the element.
 * @attr {Boolean} type - The type of the button. Possible values are: `submit`, `reset`, `button`
 * @attr {Boolean} value - Defines the value associated with the button which is submitted with the form data.
 * @attr {Boolean} svgIconLeft - Pass in SVG string for icon to appear on the LEFT
 * @attr {Boolean} svgIconRight - Pass in SVG string for icon to appear on the RIGHT
 *
 * @slot - Provide text for the button.
 */
class AuroButton extends LitElement {
  static get styles() {
    return css`
      ${styleCss}
    `;
  }

  static get properties() {
    return {
      autofocus:        {
        type: Boolean,
        reflect: true
      },
      disabled:         {
        type: Boolean,
        reflect: true
      },
      ondark:           {
        type: Boolean,
        reflect: true
      },
      secondary:        {
        type: Boolean,
        reflect: true
      },
      tertiary:         {
        type: Boolean,
        reflect: true
      },
      arialabel:        {
        type: String,
        reflect: true
      },
      arialabelledby:   {
        type: String,
        reflect: true
      },
      title:            {
        type: String,
        reflect: true
      },
      type:             {
        type: String,
        reflect: true
      },
      value:            {
        type: String,
        reflect: true
      },
      id:               { type: String },
      svgIconLeft:      { type: String },
      svgIconRight:     { type: String },
    };
  }

  /**
   * Internal method to apply focus
   * @returns {Array} - The DOM node for the button element
   */
  focus() {
    this.renderRoot.querySelector('button').focus();
  }

  /**
   * Internal method to parse svgIcon
   * @param {String} svgIcon - The SVG value of the ES6.js version of the icon
   * @returns {ChildNode} - The SVG node
   */
  getIcon(svgIcon) {
    this.dom = new DOMParser().parseFromString(svgIcon, 'text/html');
    this.svg = this.dom.body.firstChild;

    return this.svg;
  }

  render() {

    const classes = {
      'util_insetLg--squish': true,
      'auro-button': true,
      'auro-buttonOndark': this.ondark,
      'auro-button--secondary': this.secondary,
      'auro-buttonOndark--secondary': this.secondary && this.ondark,
      'auro-button--tertiary': this.tertiary,
      'auro-buttonOndark--tertiary': this.tertiary && this.ondark,
      'icon': this.svgIconLeft || this.svgIconRight
    };

    return html`
      <button
        aria-label="${ifDefined(this.arialabel ? this.arialabel : undefined)}"
        aria-labelledby="${ifDefined(this.arialabelledby ? this.arialabelledby : undefined)}"
        ?autofocus="${this.autofocus}"
        class="${classMap(classes)}"
        ?disabled="${this.disabled}"
        id="${ifDefined(this.id ? this.id : undefined)}"
        title="${ifDefined(this.title ? this.title : undefined)}"
        name="${ifDefined(this.name ? this.name : undefined)}"
        type="${ifDefined(this.type ? this.type : undefined)}"
        .value="${ifDefined(this.value ? this.value : undefined)}"
        @click="${() => {}}"
      >
        ${ifDefined(this.svgIconLeft ? this.getIcon(this.svgIconLeft) : undefined)}
        <slot></slot>
        ${ifDefined(this.svgIconRight ? this.getIcon(this.svgIconRight) : undefined)}
      </button>
    `;
  }
}

if (!customElements.get("auro-button")) {
  customElements.define("auro-button", AuroButton);
}
