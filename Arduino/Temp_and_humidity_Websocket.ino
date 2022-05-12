#include <ArduinoWebsockets.h>
#include <WiFi.h>
#include "DHT.h"
#include <LiquidCrystal_I2C.h>
#include <Adafruit_SSD1306.h> 
#include <Wire.h>
using namespace websockets;

const char* ssid              = "Hotspot";
const char* password          = "sgx98tsp";
const char* websockets_server = "ws://websockets-cheese.herokuapp.com"; //server adress and port

int DHTpin = 16;
#define DHTTYPE DHT22
DHT dht(DHTpin, DHTTYPE);

int tal = 0; 
int VCC = 2;


unsigned long lastConnectionTime = 0;            // last time you connected to the server, in milliseconds
const unsigned long postingInterval = 60L * 1000L; // delay between updates, in milliseconds


const int voltagePin = VCC; 
int voltageValue = 4095; 

// set the LCD number of columns and rows
int lcdColumns = 16;
int lcdRows = 2;
LiquidCrystal_I2C lcd(0x3F, lcdColumns, lcdRows);

// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)I2C adress: 0x3C 
Adafruit_SSD1306 display(128, 64); 

// Generic catch-all implementation.
template <typename T_ty> struct TypeInfo { static const char * name; };
template <typename T_ty> const char * TypeInfo<T_ty>::name = "unknown";



WebsocketsClient client;
void setup()
{
    Serial.begin(115200);
    while (!Serial);

    // WIFI SETUP
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    delay(5000);
    while(WiFi.status() != WL_CONNECTED)
    {
        Serial.println("Restarting");
        delay(2000);
        WiFi.begin(ssid, password);
    }
    Serial.println("");
    Serial.print("WiFi connected, IP: ");
    Serial.println(WiFi.localIP());

    if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3D for 128x64 
      Serial.println("SSD1306 allocation failed"); 
      for(;;); 
    }

    

    
    client.onEvent(onEventsCallback);

    // Connect to server
    client.connect(websockets_server);
    // Send a ping
    client.ping();
    client.send("sensor");
    if(client.available()){
      client.poll();
    }
    client.onMessage(onMessageCallback);
    dht.begin();

    // initialize LCD
    lcd.init();
    // turn on LCD backlight
    lcd.backlight();

    
}

void loop()
{
    
    if (client.available())
    {
        float temp = dht.readTemperature();
        float hum = dht.readHumidity();
        LCD(temp, hum);
        client.poll();
        client.ping();
        if(millis()-lastConnectionTime > postingInterval){
          HandleData(client);
        }
    }
    voltage();
    while(WiFi.status()!= WL_CONNECTED || !client.available()){
      Serial.println("Restarting");
      WiFi.disconnect();
      WiFi.reconnect();
      LCD_ERROR();
      delay(1000);
      lcd.clear();
        // Connect to server
      client.connect(websockets_server);
      // Send a ping
      client.ping();
      delay(2000);
    }
}


void onEventsCallback(WebsocketsEvent event, String data)
{
    if (event == WebsocketsEvent::ConnectionOpened)
    {
        Serial.println("Connection Opened");
    }
    else if (event == WebsocketsEvent::ConnectionClosed)
    {
        Serial.println("Connection Closed");
    }
    else if (event == WebsocketsEvent::GotPing)
    {
        Serial.println("Got a Ping!");
    }
    else if (event == WebsocketsEvent::GotPong)
    {
        Serial.println("Got a Pong!");
    }
}

void onMessageCallback(WebsocketsMessage message){
  Serial.print("Got Message: ");
  Serial.println(message.data());
  /*Do something with the data, If it is the config message. Didn't have time to do this :( */
}
void HandleData(WebsocketsClient& client){
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  String Data = String(temp) + "," + String(hum); 
  Serial.println(Data);
  client.send(Data);
  lastConnectionTime = millis();
  }

  void LCD(float temp,float hum){
  // set cursor to first column, first row
  lcd.setCursor(0, 0);
  lcd.print("Temperatur");
  lcd.setCursor(0, 1);
  // print message
  lcd.print(temp);
  delay(1000);
  // clears the display to print new message
  lcd.clear();
  // set cursor to first column, second row
  lcd.setCursor(0, 0);
  lcd.print("Luftfugtighed");
  lcd.setCursor(0, 1);
  lcd.print(hum);
  delay(1000);
  lcd.clear(); 
  }

  void voltage(){
  display.clearDisplay();
  display.setTextColor(WHITE);
  display.setCursor(32,17);
  display.println("Voltage:"); 
  voltageValue = analogRead(voltagePin); 
  int voltage = voltageValue * (3.3 / 4095);
  Serial.println(voltageValue); 
  display.setCursor(32,30); 
  display.println(String(voltage) + "%"); 
  display.setTextColor(WHITE);
  display.setCursor(32,56);
  display.println("Virker det her?"); 
  display.display(); 
  }

  void LCD_ERROR(){
  lcd.setCursor(0, 0);
  lcd.print("ERORR: ");
  lcd.setCursor(0, 1);
  lcd.print("Wifi or client unavaliable");
  }
 
