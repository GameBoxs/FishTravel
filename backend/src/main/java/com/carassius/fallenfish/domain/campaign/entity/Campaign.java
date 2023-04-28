package com.carassius.fallenfish.domain.campaign.entity;

import com.carassius.fallenfish.common.entity.BaseTimeEntity;
import com.carassius.fallenfish.domain.campain_problem_marker.entity.CampaignProblemMarker;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Campaign extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String name;

    private int stage;

    @Builder.Default
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CampaignProblemMarker> campaignProblemMarkers = new ArrayList<>();
}