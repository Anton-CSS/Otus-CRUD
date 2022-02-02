import { EventType } from "../type";
import Connect from "../connection/connect";

export const view = async (array: EventType[]) => {
  const body = document.body as HTMLBodyElement;
  body.innerHTML = "";
  let id: number;
  const h1 = document.createElement("h1") as HTMLHeadingElement;
  h1.textContent = "The calendar of tasks";
  const table = document.createElement("table") as HTMLTableElement;
  table.insertAdjacentHTML(
    "afterbegin",
    `
    <thead>
    <tr>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
        <th>Sunday</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td id="1">1</td>
        <td id="2">2</td>
        <td id="3">3</td>
        <td id="4">4</td>
        <td id="5">5</td>
        <td id="6">6</td>
        <td id="7">7</td>
    </tr>
    <tr>
        <td id="8">8</td>
        <td id="9">9</td>
        <td id="10">10</td>
        <td id="11">11</td>
        <td id="12">12</td>
        <td id="13">13</td>
        <td id="14">14</td>
    </tr>
    <tr>
        <td id="15">15</td>
        <td id="16">16</td>
        <td id="17">17</td>
        <td id="18">18</td>
        <td id="19">19</td>
        <td id="20">20</td>
        <td id="21">21</td>
    </tr>
    <tr>
        <td id="22">22</td>
        <td id="23">23</td>
        <td id="24">24</td>
        <td id="25">25</td>
        <td id="26">26</td>
        <td id="27">27</td>
        <td id="28">28</td>
    </tr>
    <tr>
        <td id="29">29</td>
        <td id="30">30</td>
        <td id="31">31</td>
    </tr>
    </tbody>
    `
  );

  const figure = document.createElement("figure") as HTMLElement;
  figure.insertAdjacentHTML(
    "afterbegin",
    `
     <figcaption>Search your event</figcaption>
        <form>
            <label for="text">
                <span>Text</span>
                <input type="checkbox" id="text">
            </label>
            <label for="date">
                <span>Date</span>
                <input type="checkbox" id="date"">
            </label>
            <label for="status">
                <span>Status</span>
                <input type="checkbox" id="status">
            </label>
            <label for="tag">
                <span>Tag</span>
                <input type="checkbox" id="tag">
            </label>
            <label>
            <select id="status-result">
                <option value="false">Haven't done</option>
                <option value="true">Have done</option>
                </select>
                 <select id="tag-result">
                <option value="" selected>--Please choose an option--</option>
                <option value="job">job</option>
                <option value="home">home</option>
                <option value="purchase">purchase</option>
                <option value="urgently">urgently</option>
                </select>
                <input type="date" id="date-result" min="2022-01-01" max="2022-01-31">
                <input type="text" placeholder="Type your text here">
                <button type="submit" class="btn-push">PUSH</button>
            </label>
        </form>
         <pre class="pre"></pre>
     `
  );

  const modalEmpty = document.createElement("div") as HTMLDivElement;
  modalEmpty.classList.add("modal-empty");
  modalEmpty.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal__container">
        <h2>create event</h2>
        <form>
            <select id="tag-create">
                <option value="" selected>--Please choose an option--</option>
                <option value="job">job</option>
                <option value="home">home</option>
                <option value="purchase">purchase</option>
                <option value="urgently">urgently</option>
            </select>
            <input type="text" placeholder="Type your text here">
            <button class="btn__create">CREATE EVENT</button>
        </form>
    </div>
    `
  );

  const modalUpdate = document.createElement("div") as HTMLDivElement;
  modalUpdate.classList.add("modal-empty");
  modalUpdate.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="modal__container">
        <h2>create event</h2>
        <form>
            <select id="tag-update">
                <option value="" selected>--Please choose an option--</option>
                <option value="job">job</option>
                <option value="home">home</option>
                <option value="purchase">purchase</option>
                <option value="urgently">urgently</option>
            </select>
            <span>STATUS</span>
            <input type="checkbox">
            <input type="text" placeholder="Type your text here">
            <button class="btn__modal-update">CREATE EVENT</button>
        </form>
    </div>
    `
  );

  const modalFill = document.createElement("div") as HTMLDivElement;
  modalFill.classList.add("modal-fill");

  const tds = [...table.querySelectorAll("td")];

  tds.forEach((item, index) => {
    if (array[index].fill && +tds[index].id === array[index].id) {
      item.classList.add("full");
    }
  });

  tds.forEach((td, index) => {
    td.addEventListener("click", () => {
      id = +td.id;
      if (array[index].fill) {
        tds[index].classList.add("full");
        modalFill.insertAdjacentHTML(
          "afterbegin",
          `
    <div class="modal-fill__container">
        <h2>Event</h2>
        <div class="mf__description">
        <div class="mf__time">DATE: </br>${array[index].date}</div>
        <div class="mf__status">STATUS:</br>${array[index].status}</div>
        <div class="mf__tag">TAG: </br>${array[index].tag}</div>
        <div class="mf__text">TEXT: </br>${array[index].text}</div>
            <div>
                <button class="btn__delete">DELETE</button>
                <button class="btn__update">UPDATE</button>
            </div>
        </div>
    </div>
    `
        );
        modalFill.classList.add("active");
      } else {
        modalEmpty.classList.add("active");
      }
    });
  });

  body.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;

    if (target) {
      if (target.matches(".modal-fill")) {
        modalFill.innerHTML = "";
        modalFill.classList.remove("active");
      }

      if (target.matches(".modal-empty")) {
        modalEmpty.classList.remove("active");
      }

      if (target.matches(".btn__update")) {
        event.preventDefault();
        modalFill.innerHTML = "";
        modalFill.classList.remove("active");
        modalUpdate.classList.add("active");
      }

      if (target.matches(".btn__modal-update")) {
        modalUpdate.classList.remove("active");
        const text = (
          modalUpdate.querySelector("input[type=text]") as HTMLInputElement
        ).value;
        const tag = (document.getElementById("tag-update") as HTMLSelectElement)
          .value;
        const status = (
          modalUpdate.querySelector("input[type=checkbox]") as HTMLInputElement
        ).checked;
        await Connect.putEvent(id, tag, text, status);
        const result = await Connect.getEvents();
        await view(result);
      }

      if (target.matches(".btn-push")) {
        event.preventDefault();
        const pre = document.querySelector(".pre") as HTMLElement;
        if ((document.getElementById("text") as HTMLInputElement).checked) {
          const text = (
            figure.querySelector("input[type=text]") as HTMLInputElement
          ).value;
          const result = await Connect.searchText(text);
          pre.textContent = JSON.stringify(result);
        }
        if ((document.getElementById("status") as HTMLInputElement).checked) {
          const status = (
            figure.querySelector("#status-result") as HTMLSelectElement
          ).value;
          const result = await Connect.searchStatus(String(status));
          pre.textContent = JSON.stringify(result);
        }
        if ((document.getElementById("tag") as HTMLInputElement).checked) {
          const tag = (figure.querySelector("#tag-result") as HTMLInputElement)
            .value;
          const result = await Connect.searchTag(tag);
          pre.textContent = JSON.stringify(result);
        }
        if ((document.getElementById("date") as HTMLInputElement).checked) {
          const date = (
            figure.querySelector("#date-result") as HTMLInputElement
          ).value;
          const result = await Connect.searchDate(date);
          pre.textContent = JSON.stringify(result);
        }
      }

      if (target.matches(".btn__delete")) {
        event.preventDefault();
        await Connect.eventDelete(id);
        modalFill.innerHTML = "";
        modalFill.classList.remove("active");
        const result = await Connect.getEvents();
        await view(result);
      }

      if (target.matches(".btn__create")) {
        event.preventDefault();
        if (target.previousElementSibling) {
          if (target.previousElementSibling.previousElementSibling) {
            const input = target.previousElementSibling as HTMLInputElement;
            const select = target.previousElementSibling
              .previousElementSibling as HTMLSelectElement;
            await Connect.postEvent(id, input.value, select.value);
            input.value = "";
            select.value = "";
            modalEmpty.classList.remove("active");
            const result = await Connect.getEvents();
            await view(result);
          }
        }
      }
    }
  });

  figure.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    const chooseOptions = [
      ...figure.querySelectorAll("input[type=checkbox]"),
    ] as HTMLInputElement[];
    const switches = [
      ...(figure.querySelector("label:last-child") as HTMLElement).children,
    ] as HTMLElement[];
    if (
      target.matches("#text") ||
      target.matches("#tag") ||
      target.matches("#status") ||
      target.matches("#date")
    ) {
      switches.forEach((input) => {
        input.style.display = "none";
      });

      chooseOptions.forEach((item) => {
        if (item.checked) {
          item.checked = !item.checked;
        }
      });

      target.checked = true;

      switches.forEach((input) => {
        input.style.display = "none";
        switches[4].style.display = "block";
      });

      if (target.id === "text") switches[3].style.display = "block";
      if (target.id === "date") switches[2].style.display = "block";
      if (target.id === "status") switches[0].style.display = "block";
      if (target.id === "tag") switches[1].style.display = "block";
    }
  });
  body.append(modalUpdate);
  body.append(modalFill);
  body.append(modalEmpty);
  body.append(figure);
  body.prepend(table);
  body.prepend(h1);
};
