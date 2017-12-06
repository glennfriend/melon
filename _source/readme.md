#### 與 Greasemonkey 配合使用, 可以在 training 做 live reload
- Blank Canvas Script Handler (Chrome)
    - https://chrome.google.com/webstore/detail/blank-canvas-script-handl/pipnnjjknlabchljabhmnpdfpdobpnkk?utm_source=chrome-app-launcher-info-dialog

#### 如何不載入特定某一支 javascript file
- chrome 直接有提供 "Block request URL" 的功能

#### 如何讓 chrome 不啟用 "同源政策" 以方便在 training 環境開發
- windows cmd
    start C:\"Program Files (x86)"\Google\Chrome\Application\chrome.exe --Incognito --disable-web-security http://mail.pchome.com.tw
