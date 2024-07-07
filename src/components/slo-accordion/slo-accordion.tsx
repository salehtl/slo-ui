import { Component, h } from '@stencil/core';

@Component({
  tag: 'slo-accordion',
  styleUrl: 'slo-accordion.css',
  shadow: true,
})
export class SloAccordion {
  render() {
    return (
      <div class="accordion">
        <slot></slot>
      </div>
    );
  }
}
