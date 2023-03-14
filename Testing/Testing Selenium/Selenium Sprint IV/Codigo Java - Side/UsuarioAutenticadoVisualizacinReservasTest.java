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
public class UsuarioAutenticadoVisualizacinReservasTest {
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
  public void usuarioAutenticadoVisualizacinReservas() {
    driver.get("http://g2-frontend-destiautos.s3-website.us-east-2.amazonaws.com/home");
    driver.manage().window().setSize(new Dimension(1552, 832));
    driver.findElement(By.cssSelector(".inline-block:nth-child(2) > .button--4")).click();
    driver.findElement(By.id("emailLogin")).click();
    driver.findElement(By.id("emailLogin")).sendKeys("admin@gmail.com");
    driver.findElement(By.id("passwordLogin")).sendKeys("administradorBD");
    driver.findElement(By.cssSelector(".button2")).click();
    js.executeScript("window.scrollTo(0,232.88888549804688)");
    driver.findElement(By.cssSelector(".logo-booking > img")).click();
    js.executeScript("window.scrollTo(0,0)");
    driver.findElement(By.cssSelector(".booking-user")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(1)")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(2)")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(3)")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(4)")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(5)")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(6)")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(7) > .cardDetails__info:nth-child(4)")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(7) > .cardDetails__info:nth-child(5) > p")).click();
    driver.findElement(By.cssSelector(".cardDetails:nth-child(7) > .cardDetails__check:nth-child(9)")).click();
    driver.findElement(By.cssSelector(".button--4")).click();
    js.executeScript("window.scrollTo(0,232.88888549804688)");
  }
}
