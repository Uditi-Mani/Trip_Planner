export class RequestManager {
  private controller: AbortController | null = null;
  nextSignal() { this.controller?.abort(); this.controller = new AbortController(); return this.controller.signal; }
  cancel() { this.controller?.abort(); this.controller = null; }
}
