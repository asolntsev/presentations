package eu.devclub.search;

import com.google.inject.Guice;
import com.google.inject.Injector;
import com.opensymphony.xwork2.ObjectFactory;
import org.apache.struts2.util.ObjectFactoryDestroyable;

import java.util.Map;

/**
 * Copied from:
 * http://www.struts2.info/displaycontent/content/struts2-guice-custom-type-conversion
 * <p/>
 * <p/>
 * A simplified Guice {@link ObjectFactory}. The factory that comes with the
 * guice-struts2 plug-in fails when using custom type converters. It does not
 * appear that this issue will be fixed in either Struts2 or the Guice plug-in
 * in the near future:
 * <p/>
 * https://issues.apache.org/jira/browse/WW-2898
 * http://code.google.com/p/googl...issues/detail?id=278
 *
 * @author Steven Benitez
 */
public class StrutsGuiceObjectFactory extends ObjectFactory implements ObjectFactoryDestroyable {
  private Injector injector;

  public StrutsGuiceObjectFactory() {
    injector = Guice.createInjector(new Module());
  }

  /**
   * Returns false, since Guice is capable of injecting parameters into
   * action constructors.
   *
   * @return false.
   */
  @Override
  public boolean isNoArgConstructorRequired() {
    return false;
  }

  @Override
  @SuppressWarnings("unchecked")
  public Object buildBean(final Class clazz, final Map extraContext) {
    return injector.getInstance(clazz);
  }

  @Override
  public void destroy() {
    injector = null;
  }
}