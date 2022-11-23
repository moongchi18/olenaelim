package auction.guad.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.MailUtil;
import io.swagger.annotations.ApiOperation;

@RestController
public class EmailController {

		@Autowired
		private MailUtil mailUtil;
		
		@ApiOperation(value = "신고접수 내용 메일전송", notes = "고객 이메일(아이디) 주소에 신고접수내용을 발송")
		@PostMapping("/notify/email")
		public void contextLoad() throws Exception {
			Map<String, Object> variables = new HashMap<>();
			variables.put("title", "Study List");

			mailUtil.sendTemplateMail("olenaelim@google.com", "테스트 메일", "용우종", variables);
		}
}
