package eu.devclub.search;

import org.eclipse.jetty.server.Connector;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.HandlerCollection;
import org.eclipse.jetty.server.nio.SelectChannelConnector;
import org.eclipse.jetty.webapp.WebAppContext;

import javax.naming.NamingException;

public class Launcher {
  private final int port;
  private final Server server;

  public Launcher(int port) {
    this.port = port;
    this.server = new Server();
  }

  public void start() throws NamingException {
    Connector connector = new SelectChannelConnector();
    connector.setPort(port);
    connector.setMaxIdleTime(30000);
    server.addConnector(connector);

    HandlerCollection webapps = new HandlerCollection();
    webapps.addHandler(new WebAppContext("web", "/search"));
    server.setHandler(webapps);

    addShutdownHook();

    try {
      server.start();
    } catch (Exception e) {
      stop();
      throw new RuntimeException("Cannot start web server", e);
    }
  }

  private void addShutdownHook() {
    Runtime.getRuntime().addShutdownHook(new Thread("SearchLauncherShutdownHook") {
      public void run() {
        Launcher.this.stop();
      }
    });
  }

  public final void stop() {
    if (server != null) {
      try {
        server.stop();
      } catch (Exception ignore) {
      }
    }
  }

  public static void main(String[] args) throws NamingException {
    new Launcher(8080).start();
  }
}