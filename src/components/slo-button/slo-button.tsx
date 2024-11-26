import { Component, Host, h, Prop, Element, Listen } from '@stencil/core';
import { LoadingMessage, loadingId } from '../common/loading-message/loading-message';

@Component({
  tag: 'slo-button',
  styleUrl: 'slo-button.css', 
  shadow: true,
})
export class SloButton {
  @Element() public host!: HTMLElement;

  /** Specifies the type of the button (e.g., 'submit', 'button', 'reset'). */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Disables the button, preventing interaction. */
  @Prop() disabled: boolean = false;

  /** Specifies the variant/style of the button (e.g., 'primary', 'secondary'). */
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  /** Specifies whether the button should be outlined or filled. */
  @Prop() appearance: 'outline' | 'filled' = 'filled';

  /** Controls the loading state of the button */
  @Prop() loading: boolean = false;

  private initialLoading: boolean = false;

  @Listen('click', { capture: true })
  public onClick(e: MouseEvent): void {
    if (this.disabled || this.loading) {
      e.stopPropagation();
    }
  }

  public componentWillLoad(): void {
    this.initialLoading = this.loading;
  }

  public componentWillUpdate(): void {
    if (this.loading) {
      this.initialLoading = true;
    }
  }

  render() {
    return (
      <Host>
        <button
          type={this.type}
          disabled={this.disabled || this.loading}
          class={`slo-button slo-button--${this.variant} slo-button--${this.appearance} ${this.loading ? 'slo-button--loading' : ''}`}
          aria-busy={this.loading}
          aria-describedby={this.loading ? loadingId : undefined}
        >
          {this.loading ? (
            <LoadingMessage loading={this.loading} initialLoading={this.initialLoading} />
          ) : (
            <slot />
          )}
        </button>
      </Host>
    );
  }
}