
package org.anyframe.web.sso.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.anyframe.web.sso.model.GenerateAuthCookie;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller("SSOController")
public class SSOController {
	
	// @Autowired
	private RestTemplate restTemplate = new RestTemplate();
	
	@ResponseBody
	@RequestMapping(value = "/loginToForum/{userName}/{password}")
	public String loginToForum(@PathVariable String userName, @PathVariable String password,
			HttpServletResponse response) {
			
		String url = "https://forum.ssc.com/api/user/generate_auth_cookie/?username=" + userName + "&password="
				+ password;
				
		GenerateAuthCookie authCookie = restTemplate.getForObject(url, GenerateAuthCookie.class);
		
		authCookie.setCookie(authCookie.getCookie().replace("|", "%7C"));
		
		System.out.println(authCookie);
		
		Cookie cookie = new Cookie(authCookie.getCookieName(), authCookie.getCookie());
		
		cookie.setDomain(".ssc.com");
		cookie.setPath("/");
		cookie.setMaxAge(-1);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		
		response.addCookie(cookie);
		
		Cookie cookie2 = new Cookie("wordpress_sec_81072bb0499f294888ff48c5f2cf3308", authCookie.getCookie());
		
		cookie2.setDomain(".ssc.com");
		cookie2.setPath("/wp-content/plugins");
		cookie2.setMaxAge(-1);
		cookie2.setHttpOnly(true);
		cookie2.setSecure(true);
		
		response.addCookie(cookie2);
		
		Cookie cookie3 = new Cookie("wordpress_sec_81072bb0499f294888ff48c5f2cf3308", authCookie.getCookie());
		
		cookie3.setDomain(".ssc.com");
		cookie3.setPath("/wp-admin");
		cookie3.setMaxAge(-1);
		cookie3.setHttpOnly(true);
		cookie3.setSecure(true);
		
		response.addCookie(cookie2);
		
		return authCookie.toString();
		
	}
	
}
