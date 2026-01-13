package com.poly;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(urlPatterns = "/init", loadOnStartup = 1)
public class InitServlet extends HttpServlet {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
    public void init() throws ServletException {
        super.init();
        // Instancie le service pour déclencher Hibernate
        new PersonServiceImp1();
        System.out.println("Hibernate tables should be created now!");
    }
}
