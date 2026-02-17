// ESTADO GLOBAL
let allMembers = [];
const urlParams = new URLSearchParams(window.location.search);
const currentChamber = urlParams.get("chamber") || "senate";

// INICIO
init();

async function init() {
    highlightCurrentPage();
    toggleIntroText(currentChamber);
    
    const jsonPath = getJsonPath(currentChamber);

    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        allMembers = data.results[0].members;

        fillStateSelect();
        setupListeners();
        applyFilters();
    } catch (error) {
        console.error("Error cargando el archivo JSON:", error);
    }
}

function getJsonPath(chamber) {
    return chamber === "house" ? "datos/house_data.json" : "datos/senado.json";
}

function highlightCurrentPage() {
    const currentUrl = window.location.href;
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentUrl.includes(linkHref)) {
            link.classList.add('active');
            if (link.classList.contains('dropdown-item')) {
                document.getElementById('navbarDropdown').classList.add('active');
            }
        }
    });
}

function toggleIntroText(chamber) {
    if (chamber === "house") {
        document.getElementById("house-info").classList.remove("d-none");
    } else {
        document.getElementById("senate-info").classList.remove("d-none");
    }
}

function renderTable(members) {
    const tbody = document.getElementById("memberTbody");
    tbody.innerHTML = "";

    members.forEach(m => {
        const tr = document.createElement("tr");
        const fullName = formatFullName(m);
        const nameContent = m.url 
            ? `<a href="${m.url}" target="_blank">${fullName}</a>` 
            : fullName;
        const votes = formatVotePercentage(m.votes_with_party_pct);

        tr.innerHTML = `
            <td>${nameContent}</td>
            <td>${m.party}</td>
            <td>${m.state}</td>
            <td>${m.seniority}</td>
            <td>${votes}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("countLabel").textContent = `Mostrando ${members.length} miembros.`;
}

function formatFullName(member) {
    return [member.first_name, member.middle_name, member.last_name].filter(Boolean).join(' ');
}

function formatVotePercentage(percentage) {
    return percentage ? `${percentage}%` : "N/D";
}

function setupListeners() {
    document.querySelectorAll(".party-filter").forEach(c => c.addEventListener("change", applyFilters));
    document.getElementById("stateSelect").addEventListener("change", applyFilters);
}

function fillStateSelect() {
    const select = document.getElementById("stateSelect");
    const states = [...new Set(allMembers.map(m => m.state))].sort();
    
    states.forEach(st => {
        const opt = document.createElement("option");
        opt.value = st;
        opt.textContent = st;
        select.appendChild(opt);
    });
}

function applyFilters() {
    const selectedParties = Array.from(document.querySelectorAll(".party-filter:checked")).map(c => c.value);
    const selectedState = document.getElementById("stateSelect").value;

    const filtered = allMembers.filter(m => {
        const partyOk = selectedParties.includes(m.party);
        const stateOk = (selectedState === "ALL") || (m.state === selectedState);
        return partyOk && stateOk;
    });

    renderTable(filtered);
}