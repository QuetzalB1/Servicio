// ESTADO GLOBAL
let currentMembers = [];

// INICIO
init();

async function init() {
    try {
        currentMembers = await loadMembers();
        if (!currentMembers || !currentMembers.length) return;
        
        renderPartySummary(currentMembers);
        renderRankings(currentMembers);
        displayTotalMembers(currentMembers);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

function getChamberFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('chamber');
}

function getJsonPath(chamber) {
    return chamber === 'house' ? 'datos/house.json' : 'datos/senado.json';
}

async function loadMembers() {
    const chamber = getChamberFromUrl();
    const jsonPath = getJsonPath(chamber);
    const res = await fetch(jsonPath);
    const data = await res.json();
    return data.results ? data.results[0].members : data.members || data;
}

function formatFullName(member) {
    return [member.first_name, member.middle_name, member.last_name].filter(Boolean).join(' ');
}

function calculatePartyStats(members) {
    const parties = { D: { count: 0, pctSum: 0 }, R: { count: 0, pctSum: 0 }, ID: { count: 0, pctSum: 0 } };
    
    members.forEach(m => {
        const party = m.party || 'ID';
        const pct = Number(m.votes_with_party_pct) || 0;
        parties[party].count++;
        parties[party].pctSum += pct;
    });
    
    return Object.entries(parties).map(([party, stats]) => ({
        party,
        count: stats.count,
        avgPct: stats.count ? +(stats.pctSum / stats.count).toFixed(2) : 0
    }));
}

function getTopPercentile(members, percentile, key, ascending = true) {
    const filtered = [...members].filter(m => m[key] !== null && m[key] !== undefined);
    
    filtered.sort((a, b) => {
        const va = Number(a[key]);
        const vb = Number(b[key]);
        return ascending ? va - vb : vb - va;
    });
    
    const n = Math.ceil(filtered.length * percentile / 100);
    if (n === 0) return [];
    
    const cutoff = Number(filtered[n - 1][key]);
    return filtered.filter(m => ascending ? Number(m[key]) <= cutoff : Number(m[key]) >= cutoff);
}

function renderPartySummary(members) {
    const table = document.getElementById('party-summary-body');
    if (!table) return;
    
    const stats = calculatePartyStats(members);
    const total = members.length;
    let html = '';
    
    stats.forEach(s => {
        html += `<tr><td>${s.party}</td><td>${s.count}</td><td>${s.avgPct}%</td></tr>`;
    });
    
    html += `<tr class="table-light"><td><strong>Total</strong></td><td><strong>${total}</strong></td><td></td></tr>`;
    table.innerHTML = html;
}

function renderMembersList(members, key, ascending, tbodyId, showVotes = false) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    
    const list = getTopPercentile(members, 10, key, ascending);
    let html = '';
    
    list.forEach(m => {
        const name = formatFullName(m);
        const party = m.party || '';
        const state = m.state || '';
        const missed = m.missed_votes || '';
        const missedPct = m.missed_votes_pct !== undefined ? `${Number(m.missed_votes_pct).toFixed(2)}%` : '';
        const votes = m.total_votes || '';
        const partyPct = m.votes_with_party_pct !== undefined ? `${Number(m.votes_with_party_pct).toFixed(2)}%` : '';
        
        if (showVotes) {
            html += `<tr><td>${name}</td><td>${party}</td><td>${state}</td><td>${votes}</td><td>${partyPct}</td></tr>`;
        } else {
            html += `<tr><td>${name}</td><td>${party}</td><td>${state}</td><td>${missed}</td><td>${missedPct}</td></tr>`;
        }
    });
    
    tbody.innerHTML = html;
}

function renderRankings(members) {
    renderMembersList(members, 'missed_votes_pct', true, 'most-engaged-body', false);
    renderMembersList(members, 'missed_votes_pct', false, 'least-engaged-body', false);
    renderMembersList(members, 'votes_with_party_pct', false, 'most-loyal-body', true);
    renderMembersList(members, 'votes_with_party_pct', true, 'least-loyal-body', true);
}

function displayTotalMembers(members) {
    const totalEl = document.getElementById('total-members');
    if (totalEl) totalEl.textContent = `Total miembros: ${members.length}`;
}