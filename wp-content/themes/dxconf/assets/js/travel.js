( function () {
    'use strict';

    function fallbackCopy( text ) {
        const textarea = document.createElement( 'textarea' );

        textarea.value = text;
        textarea.setAttribute( 'readonly', '' );
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild( textarea );
        textarea.select();

        const copied = document.execCommand( 'copy' );
        textarea.remove();

        if ( ! copied ) {
            throw new Error( 'Copy command failed.' );
        }
    }

    async function copyAddress( button ) {
        const address = button.dataset.copyAddress;
        const label = button.querySelector( '.eigdx-copy-address-label' );

        if ( ! address || ! label ) {
            return;
        }

        try {
            if ( navigator.clipboard && window.isSecureContext ) {
                await navigator.clipboard.writeText( address );
            } else {
                fallbackCopy( address );
            }

            label.textContent = 'Copied!';
            button.classList.add( 'is-copied' );

            window.setTimeout( function () {
                label.textContent = 'Copy address';
                button.classList.remove( 'is-copied' );
            }, 2000 );
        } catch ( error ) {
            label.textContent = 'Copy unavailable';

            window.setTimeout( function () {
                label.textContent = 'Copy address';
            }, 2500 );
        }
    }

    document.addEventListener( 'click', function ( event ) {
        const button = event.target.closest( '[data-copy-address]' );

        if ( button ) {
            copyAddress( button );
        }
    } );
}() );
