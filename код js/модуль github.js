package com.example.singlewebviewapp

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Инициализация WebView
        webView = WebView(this)
        setContentView(webView)

        // Настройка WebViewClient, чтобы ссылки открывались внутри приложения
        webView.webViewClient = WebViewClient()

        // Включение поддержки JavaScript
        webView.settings.javaScriptEnabled = true

        // Привязка Java/Kotlin объекта к JavaScript (создаем мост "AndroidBridge")
        webView.addJavascriptInterface(WebAppInterface(), "AndroidBridge")

        // Загрузка локального HTML-файла из папки assets
        webView.loadUrl("file:///android_asset/index.html")
    }

    // Класс интерфейса для взаимодействия с JavaScript
    inner class WebAppInterface {

        // Вызов Android-функции из JavaScript
        @JavascriptInterface
        fun showToast(message: String) {
            runOnUiThread {
                Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show()
            }
        }

        // Пример передачи данных из Android обратно в JavaScript
        @JavascriptInterface
        fun triggerAndroidAction() {
            runOnUiThread {
                val dataToSend = "Привет из Android-кода!"
                // Вызываем JS-функцию из native-кода
                webView.evaluateJavascript("javascript:receiveFromAndroid('$dataToSend')", null)
            }
        }
    }
}
