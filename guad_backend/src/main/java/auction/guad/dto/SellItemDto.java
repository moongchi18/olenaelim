package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SellItemDto {
	private String sellType;
	private String memberEmail;
	
	private int itemNum;
	private String itemSub;
	private int itemPrice;
	private String itemType;
	private String itemDType;
	private Date writeDate;
	private int hitCnt;
	private int AStartPrice;
	private int AMaxPrice;
	private int AMinPrice;
	private int APeriod;
	
	private String soldYn;
	private Date soldDate;
	private String deleteYn;
	private Date deleteDate;
}