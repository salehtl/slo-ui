import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'basic-card',
  styleUrls: ['basic-card.css', '../typography.css'],
  shadow: true,
})
export class BasicCard {
  @Prop() type: string;
  @Prop() heading: string;
  @Prop() description: string;
  @Prop() summary: string;
  @Prop() href: string;
  @Prop() disabled: boolean;

  private getTabIndex() {
    return this.disabled ? -1 : 0;
  }

  private getAriaDisabled() {
    return this.disabled ? 'true' : null;
  }

  render() {
    return (
      <a
        class={{ card: true, disabled: this.disabled }}
        href={this.disabled ? undefined : this.href}
        tabIndex={this.getTabIndex()}
        aria-disabled={this.getAriaDisabled()}
      >
        <small>{this.type}</small>
        <p class="card-heading">{this.heading}</p>
        <p>{this.description || this.summary}</p>
      </a>
    );
  }
}
