<?php
/* Eenvoudige lijn-iconen (SVG), geen emoji's */
function icoon(string $naam): string
{
    $paden = [
        'user'     => '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
        'users'    => '<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-5.5 7-5.5s7 2 7 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.8c2.4.6 4 2.3 4 5.2"/>',
        'lock'     => '<rect x="5" y="11" width="14" height="10"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
        'dumbbell' => '<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>',
        'list'     => '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
        'timer'    => '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
        'repeat'   => '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
        'bowl'     => '<path d="M3 11h18a9 9 0 0 1-18 0zM12 3v4M8 5l1 3M16 5l-1 3"/>',
        'search'   => '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/>',
        'pie'      => '<path d="M21 12A9 9 0 1 1 12 3v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',
        'grid'     => '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
        'chart'    => '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/>',
        'barcode'  => '<path d="M3 5v14M7 5v14M10 5v14M14 5v14M17 5v14M21 5v14"/>',
        'spark'    => '<path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/>',
        'calc'     => '<rect x="5" y="2" width="14" height="20"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',
        'plates'   => '<path d="M2 12h20"/><rect x="5" y="6" width="3" height="12"/><rect x="16" y="6" width="3" height="12"/><rect x="8.5" y="8" width="2" height="8"/><rect x="13.5" y="8" width="2" height="8"/>',
        'ruler'    => '<path d="M3 17L17 3l4 4L7 21z"/><path d="M7 13l2 2M10 10l2 2M13 7l2 2"/>',
        'camera'   => '<path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/>',
        'trophy'   => '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H3c0 3 2 5 4 5M17 6h4c0 3-2 5-4 5"/>',
        'watch'    => '<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6l1-4h4l1 4M9 18l1 4h4l1-4M12 9v3l2 1"/>',
        'arrow'    => '<path d="M5 12h14M13 6l6 6-6 6"/>',
        'mail'     => '<rect x="3" y="5" width="18" height="14"/><path d="M3 6l9 7 9-7"/>',
        'pin'      => '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
        'check'    => '<path d="M4 12l5 5L20 6"/>',
        'school'   => '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/>',
    ];
    $pad = $paden[$naam] ?? $paden['spark'];
    return '<svg class="icoon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter">' . $pad . '</svg>';
}
