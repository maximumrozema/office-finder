let offices = [];
let currentSort = "occupant";

const list = document.getElementById("directory");
const details = document.getElementById("details");
fetch("data/offices.json").then(r => r.json()).then(data => {
  offices = data;
  render(data);
});

function render(items) {
    list.innerHTML = "";

    const sortedItems = [...items];

    if (currentSort === "occupant") {
        sortedItems.sort((a, b) =>
            a.occupant.localeCompare(b.occupant)
        );
    } else {
        sortedItems.sort((a, b) =>
            a.office.localeCompare(
                b.office,
                undefined,
                { numeric: true }
            )
        );
    }

    sortedItems.forEach(o => {
        const li = document.createElement("li");

        li.textContent =
            `${o.occupant} (Office ${o.office})`;

        li.onclick = () => showOffice(o);

        list.appendChild(li);
    });
}

document.getElementById("sortBy").addEventListener("change", (e) => {
    currentSort = e.target.value;

    const searchText =
        document.getElementById("search").value.toLowerCase();

    const filtered = offices.filter(o =>
        o.occupant.toLowerCase().includes(searchText) ||
        o.office.includes(searchText)
    );

    render(filtered);
});

function showOffice(o) {
  details.innerHTML = `<h2>${o.occupant}</h2><p>Office ${o.office}</p><p>${o.department}</p>`;
  const svgDoc = document.getElementById('floorplan').contentDocument;
  if (!svgDoc) return;
  svgDoc.querySelectorAll('.office').forEach(el => el.classList.remove('selected'));
  const room = svgDoc.getElementById(o.svgId);
  if (room) room.classList.add('selected');
}
