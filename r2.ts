import { AuthenticatorAssertionResponse } from 'webauthn';

// Function to handle FIDO2 authentication
async function authenticateWith2FA(): Promise<void> {
    try {
        // Start the FIDO2 authentication process
        const fidoAssertionOptions = await fetch('/fido2/authenticate', { method: 'POST' }).then(response => response.json());

        // Perform the FIDO2 authentication with the user's authenticator
        const fidoAssertion = await navigator.credentials.get({
            publicKey: fidoAssertionOptions
        }) as AuthenticatorAssertionResponse;

        // Assuming you have a function to verify the FIDO2 assertion server-side
        const fido2Verified = await verifyFido2Assertion(fidoAssertion);

        if (fido2Verified) {
            // FIDO2 authentication succeeded, proceed with 2FA
            const otp = prompt('Enter your one-time passcode (OTP):');
            const isOTPVerified = await verifyOTP(otp);

            if (isOTPVerified) {
                console.log('Authentication successful');
            } else {
                console.error('OTP verification failed');
            }
        } else {
            console.error('FIDO2 authentication failed');
        }
    } catch (error) {
        console.error('Authentication failed:', error);
    }
}

// Function to verify the FIDO2 assertion server-side
async function verifyFido2Assertion(fidoAssertion: AuthenticatorAssertionResponse): Promise<boolean> {
    try {
        const response = await fetch('/fido2/verify-assertion', {
            method: 'POST',
            body: JSON.stringify(fidoAssertion)
        });
        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Error verifying FIDO2 assertion:', error);
        return false;
    }
}

// Function to verify the one-time passcode (OTP) server-side
async function verifyOTP(otp: string): Promise<boolean> {
    try {
        const response = await fetch('/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ otp })
        });
        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return false;
    }
}

// Example usage
// Assuming you have a button or trigger to initiate authentication
document.getElementById('authenticateButton')?.addEventListener('click', authenticateWith2FA);

