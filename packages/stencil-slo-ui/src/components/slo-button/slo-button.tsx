import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'slo-button',
  styleUrl: 'slo-button.css',
  shadow: true,
})
export class SloButton {
  /**
   * The button text content
   */
  @Prop() text: string = 'Click me';

  /**
   * Whether the button is disabled
   */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**
   * The button type (button, submit, reset)
   */
  @Prop({ reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Optional CSS class to add to the button
   */
  @Prop({ reflect: true }) class?: string;

  render() {
    return (
      <button
        type={this.type}
        class={this.class}
        disabled={this.disabled}
      >
        {this.text}
      </button>
    );
  }
}
