package com.carassius.fallenfish.domain.campain_problem_marker.entity;

import com.carassius.fallenfish.common.entity.BaseTimeEntity;
import com.carassius.fallenfish.domain.campaign.entity.Campaign;
import com.carassius.fallenfish.domain.problem_marker.entity.ProblemMarker;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CampaignProblemMarker extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_marker_id")
    private ProblemMarker problemMarker;
}