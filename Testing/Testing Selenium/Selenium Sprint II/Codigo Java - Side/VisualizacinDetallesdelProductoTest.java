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
public class VisualizacinDetallesdelProductoTest {
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
  public void visualizacinDetallesdelProducto() {
    driver.get("http://localhost:3000/home");
    assertThat(driver.findElement(By.cssSelector(".card:nth-child(1) .button--4")).getText(), is("DETAILS"));
    driver.findElement(By.cssSelector(".headerBlock__left > h1")).click();
    driver.findElement(By.cssSelector(".headerBlock")).click();
    driver.findElement(By.cssSelector(".locationData__city")).click();
    driver.findElement(By.cssSelector(".features__title")).click();
    driver.findElement(By.cssSelector(".booking")).click();
    driver.findElement(By.cssSelector(".title")).click();
  }
}