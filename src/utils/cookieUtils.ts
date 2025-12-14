
/**
 * Cookie တစ်ခု၏ တန်ဖိုးကို ပြန်ယူသည်။
 * @param name - Cookie ၏ နာမည်
 * @returns Cookie ၏ တန်ဖိုး (String) သို့မဟုတ် မတွေ့ပါက null
 */

export function getCookie(name: string): string | null {
    const cookieString = document.cookie;
    if (!cookieString) {
        return null;
    }

    const nameEQ = name + "=";
    const ca = cookieString.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
            // decodeURIComponent ဖြင့် ဖတ်ရလွယ်ကူအောင် ပြန်ပြောင်းသည်
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

/**
 * Cookie တစ်ခု သတ်မှတ်သည်။
 * @param name - Cookie ၏ နာမည်
 * @param value - သိမ်းဆည်းမည့် တန်ဖိုး
 * @param days - သက်တမ်း (ရက်ပေါင်း)
 */

export function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // encodeURIComponent ဖြင့် တန်ဖိုးကို သိမ်းသည်။
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}