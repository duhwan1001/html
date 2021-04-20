package kr.or.ddit.base;

import com.ibatis.sqlmap.client.SqlMapClient;

import kr.or.ddit.ibatis.SqlMapClientFactory;

public class BaseDao {
	private SqlMapClient smc;

	protected SqlMapClient getSqlMapClient() {
		if(smc == null)
			smc = SqlMapClientFactory.getInstance();
		
		return smc;
	}
	
}
