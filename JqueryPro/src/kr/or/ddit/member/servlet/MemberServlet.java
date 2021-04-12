package kr.or.ddit.member.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.or.ddit.member.service.MemberService;
import kr.or.ddit.member.vo.MemberVO;

@WebServlet("/MemberServlet")
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		super.doGet(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 브라우저로 부터 받은 값을 사용하기 위해 request에서 parameter를 get.
		String flag = req.getParameter("flag");
		
		try {
			if (flag.equals("L")) { // 검색
				List<MemberVO> list = retrieveMemberList(req);

				// 브라우저로 전달할 결과를 request에 attribute로 세팅
				req.setAttribute("list", list);
				RequestDispatcher disp = req.getRequestDispatcher("/html/member/memberListResult.jsp");
				disp.forward(req, resp);

			} else if (flag.equals(flag)) { // 등록
				createMember(req);
			} else if (flag.equals(flag)) { // 단건 조회

			} else if (flag.equals(flag)) { // 수정

			} else if (flag.equals(flag)) { // 삭제

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	private void createMember(HttpServletRequest req) throws SQLException {
		
		String memId = req.getParameter("memId");
		String memName = req.getParameter("memName");

		MemberVO memberVo = new MemberVO();
		memberVo.setMemId(memId);
		memberVo.setMemName(memName);
		// 그 외 정보들 VO에 세팅
		
		MemberService service = new MemberService();
		service.createMember(memberVo);
	}

	private List<MemberVO> retrieveMemberList(HttpServletRequest req) throws SQLException {

		String memId = req.getParameter("memId");
		String memName = req.getParameter("memName");
		// form serialize를 사용해서 파라미터를 전달한 경우, request에 요소의 name으로 parameter가 매핑됨.
		// 예) <input type="text" name="userId"> ==> req.getParameter("userId")

		MemberVO memberVo = new MemberVO();
		memberVo.setMemId(memId);
		memberVo.setMemName(memName);

		// 회원 목록 조회
		MemberService service = new MemberService();
		List<MemberVO> list = service.retrieveMemberList(memberVo);
		return list;
	}
}
