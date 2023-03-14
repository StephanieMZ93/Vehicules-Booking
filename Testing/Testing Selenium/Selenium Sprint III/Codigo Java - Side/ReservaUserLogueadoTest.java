// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class ReservaUserLogueadoTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void reservaUserLogueado() {
    driver.get("http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com/home");
    driver.manage().window().setSize(new Dimension(1552, 832));
    driver.findElement(By.cssSelector(".card:nth-child(1) .button--4")).click();
    js.executeScript("window.scrollTo(0,0)");
    driver.findElement(By.cssSelector(".headerBlock__left > h1")).click();
    driver.findElement(By.cssSelector(".buttonReserve > button")).click();
    js.executeScript("window.scrollTo(0,490.3999938964844)");
    driver.findElement(By.cssSelector("h2")).click();
    driver.findElement(By.id("emailLogin")).click();
    driver.findElement(By.id("emailLogin")).sendKeys("guzman@gmail.com");
    driver.findElement(By.id("passwordLogin")).sendKeys("021019993.");
    driver.findElement(By.cssSelector(".button2")).click();
    js.executeScript("window.scrollTo(0,0)");
    driver.findElement(By.cssSelector(".react-calendar__month-view:nth-child(2) .react-calendar__tile:nth-child(22)")).click();
    driver.findElement(By.cssSelector(".react-calendar__tile--hoverEnd > abbr")).click();
    driver.findElement(By.cssSelector(".buttonReserve > button")).click();
    driver.findElement(By.cssSelector(".arrive__text > .labelForm")).click();
    driver.findElement(By.cssSelector(".select-css")).click();
    {
      WebElement dropdown = driver.findElement(By.cssSelector(".select-css"));
      dropdown.findElement(By.xpath("//option[. = '03 h.']")).click();
    }
    driver.findElement(By.cssSelector(".button2")).click();
    driver.findElement(By.cssSelector(".overlay__background div:nth-child(1)")).click();
    driver.findElement(By.cssSelector(".button2:nth-child(1)")).click();
    driver.findElement(By.cssSelector(".button2:nth-child(1)")).click();
    driver.findElement(By.cssSelector(".button2:nth-child(1)")).click();
  }
}
