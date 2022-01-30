import { EventType, PostEventType } from "../type";

export default class Connect {
  static async getEvents() {
    const response = await fetch("http://localhost:7000/events");
    const result: Array<EventType> = await response.json();
    return result;
  }

  static async searchText(text: string) {
    const url = new URL("http://localhost:7000/text");
    url.searchParams.set("text", text);
    const response = await fetch(url.href);
    const result: Array<EventType> = await response.json();
    return result;
  }

  static async searchStatus(status: string) {
    const url = new URL("http://localhost:7000/status");
    url.searchParams.set("status", status);
    const response = await fetch(url.href);
    const result: Array<EventType> = await response.json();
    return result;
  }

  static async searchTag(tag: string) {
    const url = new URL("http://localhost:7000/tag");
    url.searchParams.set("tag", tag);
    const response = await fetch(url.href);
    const result: Array<EventType> = await response.json();
    return result;
  }

  static async searchDate(date: string) {
    const url = new URL("http://localhost:7000/date");
    url.searchParams.set("date", date);
    const response = await fetch(url.href);
    const result: EventType = await response.json();
    return result;
  }

  static async postEvent(id: number, tag: string, text: string) {
    const body: PostEventType = { id, tag, text };
    const response = await fetch("http://localhost:7000/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  }

  static async eventDelete(id: number) {
    const response = await fetch(`http://localhost:7000/events/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  }

  static async putEvent(
    id: number,
    tag: string,
    text: string,
    status: boolean
  ) {
    const body: PostEventType = { id, tag, status, text };

    const response = await fetch("http://localhost:7000/event", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    return result;
  }
}
