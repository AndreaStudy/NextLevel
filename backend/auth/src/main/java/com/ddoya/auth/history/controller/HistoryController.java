package com.ddoya.auth.history.controller;

import com.ddoya.auth.common.oauth.CustomUserDetails;
import com.ddoya.auth.common.response.ApiResponse;
import com.ddoya.auth.common.util.CurrentUser;
import com.ddoya.auth.history.dto.request.HistoryReqDto;
import com.ddoya.auth.history.dto.response.HistoriesResDto;
import com.ddoya.auth.history.entity.OrderType;
import com.ddoya.auth.history.entity.ProblemType;
import com.ddoya.auth.history.service.HistoryService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryService historyService;

    @GetMapping
    public ResponseEntity<ApiResponse> getProblemHistories(
        @CurrentUser CustomUserDetails customUserDetails, @RequestParam ProblemType problemType,
        @RequestParam OrderType orderType) {
        HistoriesResDto problemHistories = historyService.getProblemHistories(
            customUserDetails.getEmail(), problemType, orderType);

        return ResponseEntity.ok(
            ApiResponse.builder().status(HttpStatus.OK.value()).message("학습 내역 조회 완료")
                .data(problemHistories).build());
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addProblemHistory(
        @Valid @RequestBody HistoryReqDto historyReqDto) {
        historyService.addProblemHistory(historyReqDto);

        return ResponseEntity.ok(
            ApiResponse.builder().status(HttpStatus.CREATED.value()).message("결과 등록 완료").data(null)
                .build());
    }
}
