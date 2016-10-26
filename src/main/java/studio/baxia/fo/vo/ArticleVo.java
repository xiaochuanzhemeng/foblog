package studio.baxia.fo.vo;

import studio.baxia.fo.common.CommonConstant;
import studio.baxia.fo.pojo.Article;

public class ArticleVo extends Article {
	private String categoryName;
	private String statusName;
	private String[] tagNames;
	
	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(int status) {
		if(status==CommonConstant.ACTICLE_STATUS_BLOG){
			this.statusName=CommonConstant.ACTICLE_STATUS_BLOG_NAME;
		}else{
			this.statusName=CommonConstant.ACTICLE_STATUS_DRAFT_NAME;
		}
	}

	public String[] getTagNames() {
		return tagNames;
	}

	public void setTagNames(String[] tagNames) {
		this.tagNames = tagNames;
	}
	
}